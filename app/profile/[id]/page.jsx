'use client'

// import necessary React hooks and components
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

// define the UserProfile component
const UserProfile = ({ params }) => {
     // access Next.js session and router using hooks
     const session = useSession();
     const router = useRouter();

     // state to manage user's posts data
     const [usersPosts, setUsersPosts] = useState([]);

     // useEffect to fetch user's posts when the component mounts or when the session changes
     useEffect(() => {
          // define the fetchPosts function
          const fetchPosts = async () => {
               try {
                    // fetch user's posts data from the API
                    const response = await fetch(
                         `/api/users/${params.id}/posts`
                    );
                    // parse the response as JSON
                    const data = await response.json();
                    // set the user's posts data in the state
                    setUsersPosts(data);
               } catch (error) {
                    // log any errors that occur during the fetch
                    console.error('Error fetching user posts:', error);
               }
          };

          // only run the fetchPosts function when the user id is available
          if (params.id) {
               fetchPosts();
          }
     }, [session]); // useEffect dependency on the session to re-fetch when it changes

     // render the Profile component with relevant props
     return (
          <Profile
               name={usersPosts[0]?.creator?.username}
               desc={`Welcome to your ${usersPosts[0]?.creator?.username} profile page`}
               data={usersPosts}
          />
     );
};

// export the UserProfile component as the default export
export default UserProfile;
