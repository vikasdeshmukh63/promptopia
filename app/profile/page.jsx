'use client'

// import necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

// define the MyProfile component
const MyProfile = () => {
     // access Next.js session and router using hooks
     const session = useSession();
     const router = useRouter();

     // state to manage user's posts data
     const [myPosts, setMyPosts] = useState([]);

     // function to handle navigation to the edit page for a specific post
     const handleEdit = (post) => {
          router.push(`/update-prompt?id=${post?._id}`);
     };

     // function to handle the deletion of a post
     const handleDelete = async (post) => {
          // confirm the user's intention to delete the post
          const hasConfirmed = confirm(
               'Are you sure you want to Delete this Prompt ?'
          );

          if (hasConfirmed) {
               try {
                    // send a DELETE request to the API to delete the post
                    const response = await fetch(
                         `/api/prompt/${post._id.toString()}`,
                         { method: 'DELETE' }
                    );

                    // filter out the deleted post from the state
                    const filteredPosts = myPosts.filter(
                         (p) => p._id !== post._id
                    );
                    setMyPosts(filteredPosts);

                    // if the deletion is successful, display an alert
                    if (response.ok) {
                         alert('The Post has been Deleted Successfully');
                    }
               } catch (error) {
                    // log any errors that occur during the deletion
                    console.error(error);
               }
          }
     };

     // useEffect to fetch user's posts when the component mounts or when the session changes
     useEffect(() => {
          // define the fetchPosts function
          const fetchPosts = async () => {
               try {
                    // fetch user's posts data from the API
                    const response = await fetch(
                         `/api/users/${session?.data?.user?.id}/posts`
                    );
                    // parse the response as JSON
                    const data = await response.json();
                    // set the user's posts data in the state
                    setMyPosts(data);
               } catch (error) {
                    // log any errors that occur during the fetch
                    console.error('Error fetching user posts:', error);
               }
          };

          // only run the fetchPosts function when the user id is available
          if (session?.data?.user?.id) {
               fetchPosts();
          }
     }, [session]); // useEffect dependency on the session to re-fetch when it changes

     // useEffect to redirect unauthenticated users to the home page
     useEffect(() => {
          if (session.status === 'unauthenticated') {
               router.push('/');
          }
     });

     // render the Profile component with relevant props
     return (
          <Profile
               name='My'
               desc='Welcome to your personalized profile page'
               data={myPosts}
               handleEdit={handleEdit}
               handleDelete={handleDelete}
          />
     );
};

// export the MyProfile component as the default export
export default MyProfile;
