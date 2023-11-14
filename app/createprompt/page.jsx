'use client'

// import necessary React hooks and components
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

// define the CreatePrompt component
const CreatePrompt = () => {
     // access Next.js router and session using hooks
     const router = useRouter();
     const session = useSession();

     // state to manage form submission status and input values
     const [submitting, setSubmitting] = useState(false);
     const [post, setPost] = useState({
          prompt: '',
          tag: ''
     });

     // function to handle the creation of a new prompt
     const createPrompt = async (e) => {
          e.preventDefault();

          // set the submission status to true
          setSubmitting(true);
          try {
               // send a POST request to the API endpoint for creating a new prompt
               const response = await fetch('/api/prompt/new', {
                    method: 'POST',
                    body: JSON.stringify({
                         prompt: post.prompt,
                         userId: session?.data?.user?.id,
                         tag: post.tag
                    })
               });

               // if the response is successful, navigate to the home page
               if (response.ok) {
                    router.push('/');
               }
          } catch (error) {
               // log any errors that occur during the API request
               console.log(error);
          } finally {
               // set the submission status back to false after the request is complete
               setSubmitting(false);
          }
     };

     // render the Form component with relevant props
     return (
          <Form
               type='Create'
               post={post}
               setPost={setPost}
               submitting={submitting}
               handleSubmit={createPrompt}
          />
     );
};

// export the CreatePrompt component as the default export
export default CreatePrompt;
