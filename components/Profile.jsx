// import necessary React components and utilities
import React from 'react';
import PromptCard from './PromptCard';

//define the profile component
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
     // render different content based on whether data is available
     return (
          <>
               {data ? (
                    // displayed when there is data available
                    <section className='w-full'>
                         {/* profile header */}
                         <h1 className='head_text text_left'>
                              <span className='blue_gradient'>
                                   {name} Profile
                              </span>
                         </h1>
                         {/* profile description */}
                         <p className='desc text-left'>{desc}</p>

                         {/* list of prompts */}
                         <div className='mt-10 prompt_layout'>
                              {data.map((post) => {
                                   return (
                                        // render promptCard for each prompt
                                        <PromptCard
                                             key={post._id}
                                             post={post}
                                             // provide optional functions for edit and delete
                                             handleEdit={() =>
                                                  handleEdit && handleEdit(post)
                                             }
                                             handleDelete={() => {
                                                  handleDelete &&
                                                       handleDelete(post);
                                             }}
                                        />
                                   );
                              })}
                         </div>
                    </section>
               ) : (
                    // displayed when there is no data available
                    <section className='w-full'>
                         {/* no prompts message */}
                         <p className='desc text-center'>
                              You don't have any prompts yet.
                         </p>
                         {/* link to create a new prompt */}
                         <Link
                              href='/createprompt'
                              className='dropdown_link'
                              onClick={() => setToggleDropdown(false)}
                         >
                              Create Prompt
                         </Link>
                    </section>
               )}
          </>
     );
};

// export the Profile component as the default export
export default Profile;
