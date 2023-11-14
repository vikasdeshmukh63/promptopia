'use client'

// Import necessary React hooks and components
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

// Define the UpdatePrompt component
const UpdatePrompt = () => {
     // Access Next.js router, session, and search parameters using hooks
     const router = useRouter();
     const session = useSession();
     const searchParams = useSearchParams();

     // Extract the prompt ID from the search parameters
     const promptId = searchParams.get('id');

     // State to manage form submission status and input values
     const [submitting, setSubmitting] = useState(false);
     const [post, setPost] = useState({
          prompt: '',
          tag: ''
     });

     // Function to handle the update of an existing prompt
     const updatePrompt = async (e) => {
          e.preventDefault();

          // Set the submission status to true
          setSubmitting(true);

          // Check if the prompt ID is missing
          if (!promptId) {
               return alert('Prompt ID is Missing');
          }

          try {
               // Send a PATCH request to the API to update the prompt
               const response = await fetch(`/api/prompt/${promptId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                         prompt: post.prompt,
                         tag: post.tag
                    })
               });

               // If the update is successful, navigate to the profile page
               if (response.ok) {
                    router.push('/profile');
               }
          } catch (error) {
               // Log any errors that occur during the update
               console.error(error);
          } finally {
               // Set the submission status back to false after the request is complete
               setSubmitting(false);
          }
     };

     // useEffect to fetch prompt details when the component mounts or when the promptId changes
     useEffect(() => {
          // Define the getPromptDetails function
          const getPromptDetails = async () => {
               try {
                    // Fetch prompt details from the API using the promptId
                    const response = await fetch(`/api/prompt/${promptId}`);
                    // Parse the response as JSON
                    const data = await response.json();
                    // Set the prompt details in the state
                    setPost(data);
               } catch (error) {
                    // Log any errors that occur during the fetch
                    console.error('Error fetching prompt details:', error);
               }
          };

          // Only run the getPromptDetails function when the promptId is available
          if (promptId) {
               getPromptDetails();
          }
     }, [promptId]); // useEffect dependency on the promptId to re-fetch when it changes

     // Log the promptId to the console
     console.log(promptId);

     // Render the Form component with relevant props
     return (
          <Form
               type='Edit'
               post={post}
               setPost={setPost}
               submitting={submitting}
               handleSubmit={updatePrompt}
          />
     );
};

// Export the UpdatePrompt component as the default export
export default UpdatePrompt;
