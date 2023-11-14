// import necessary React components and styles
import React from 'react';
import Link from 'next/link';

// sefine the Form component
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
     // render the form for creating or updating a post
     return (
          <section className='w-full max-w-full flex-start flex-col'>
               {/* title */}
               <h1 className='head_text tex-left'>
                    <span className='blue_gradient'>{type} Post</span>
               </h1>
               {/* description */}
               <p className='desc text-left max-w-md'>
                    {type} and Share amazing prompts with the world, and let
                    your imagination run wild with any AI-Powered platform.
               </p>
               {/* form */}
               <form
                    onSubmit={handleSubmit}
                    className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
               >
                    {/* prompt input */}
                    <label>
                         <span className='font-satoshi font-semibold text-base text-gray-700'>
                              Your AI Prompt
                         </span>
                         <textarea
                              value={post.prompt}
                              onChange={(e) =>
                                   setPost({ ...post, prompt: e.target.value })
                              }
                              placeholder='Write your prompt here...'
                              required
                              className='form_textarea'
                         />
                    </label>
                    {/* tag input */}
                    <label>
                         <span className='font-satoshi font-semibold text-base text-gray-700'>
                              Tag{' '}
                              <span className='font-normal'>
                                   (#product, #webdevelopement, #idea)
                              </span>
                         </span>
                         <input
                              value={post.tag}
                              onChange={(e) =>
                                   setPost({ ...post, tag: e.target.value })
                              }
                              placeholder='#tag'
                              required
                              className='form_input'
                         />
                    </label>
                    {/* action buttons */}
                    <div className='flex-end mx-3 mb-5 gap-4'>
                         {/* cancel link */}
                         <Link href='/' className='text-gray-500 text-sm'>
                              Cancel
                         </Link>
                         {/* submit button */}
                         <button
                              type='submit'
                              disabled={submitting}
                              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                         >
                              {submitting ? `${type}...` : type}
                         </button>
                    </div>
               </form>
          </section>
     );
};

// export the Form component as the default export
export default Form;
