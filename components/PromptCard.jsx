// import necessary React components and utilities
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

// define the PromptCard component
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
     // get session data using useSession hook
     const session = useSession();
     // get current pathname and router using next/navigation
     const pathName = usePathname();
     const router = useRouter();
     // state to track whether the prompt is copied to the clipboard
     const [copied, setCopied] = useState('');

     // function to handle copying the prompt to the clipboard
     const handleCopy = () => {
          // set the copied state to the prompt text
          setCopied(post.prompt);
          // use the clipboard API to copy the text to the clipboard
          navigator.clipboard.writeText(post.prompt);
          // reset the copied state after 3 seconds
          setTimeout(() => {
               setCopied('');
          }, 3000);
     };

     // function to navigate to the user's profile
     const handleNavigateToUsersProfile = () => {
          if (session?.data?.user?.id === post?.creator?._id) {
               router.push('/profile');
          } else {
               router.push(`/profile/${post?.creator?._id}`);
          }
     };

     // render the promptCard component
     return (
          <div className='prompt_card'>
               {/* user info section */}
               <div className='flex justify-between items-start gap-5'>
                    <div
                         className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                         onClick={handleNavigateToUsersProfile}
                    >
                         <Image
                              width={40}
                              height={40}
                              src={post.creator.image}
                              className='rounded-full object-contain'
                              alt='profile photo'
                         />
                         <div className='flex flex-col'>
                              <h3 className='font-satoshi font-semibold text-gray-900'>
                                   {post.creator.username}
                              </h3>
                              <p className='font-inter text-sm text-gray-500'>
                                   {post.creator.email}
                              </p>
                         </div>
                    </div>
                    {/* copy button */}
                    <div className='copy_btn' onClick={handleCopy}>
                         <Image
                              src={
                                   copied === post.prompt
                                        ? '/assets/icons/tick.svg'
                                        : '/assets/icons/copy.svg'
                              }
                              width={12}
                              height={12}
                              alt='copy button'
                         />
                    </div>
               </div>
               {/* prompt text */}
               <p className='my-4 font-satoshi text-sm text-gray-700'>
                    {post.prompt}
               </p>
               {/* tag section */}
               <p
                    className='font-inter text-sm blue_gradient cursor-pointer'
                    onClick={() => {
                         handleTagClick && handleTagClick(post.tag);
                    }}
               >
                    {`#${post.tag}`}
               </p>
               {/* edit and delete options (only shown for the creator on their profile) */}
               {session?.data?.user?.id === post?.creator?._id &&
                    pathName === '/profile' && (
                         <div className='mt-5 flex-center gap-4 border-t border-gray-300 pt-3'>
                              <p
                                   className='font-inter text-sm green_gradient cursor-pointer'
                                   onClick={handleEdit}
                              >
                                   Edit
                              </p>
                              <p
                                   className='font-inter text-sm orange_gradient cursor-pointer'
                                   onClick={handleDelete}
                              >
                                   Delete
                              </p>
                         </div>
                    )}
          </div>
     );
};

// export the PromptCard component as the default export
export default PromptCard;
