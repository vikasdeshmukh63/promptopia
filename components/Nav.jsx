'use client'

// import necessary React components and utilities
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

// define the Nav component
const Nav = () => {
     // get session data using useSession hook
     const { data: session } = useSession();
     // state to manage authentication providers
     const [providers, setProviders] = useState(null);
     // state to toggle mobile navigation dropdown
     const [toggleDropdown, setToggleDropdown] = useState(false);

     // useEffect to fetch authentication providers on component mount
     useEffect(() => {
          const settingProviders = async () => {
               // fetch authentication providers
               const response = await getProviders();
               // set providers in state
               setProviders(response);
          };

          // call the settingProviders function
          settingProviders();
     }, []);

     // render the navigation component
     return (
          <nav className='flex-between w-full mb-16 pt-3'>
               {/* logo and brand name */}
               <Link href='/' className='flex gap-2 flex-center'>
                    <Image
                         width={30}
                         height={30}
                         src='/assets/images/logo.svg'
                         alt='Promptopia'
                         className='object-contain'
                    />
                    <p className='logo_text'>Promptopia</p>
               </Link>

               {/* desktop navigation */}
               <div className='sm:flex hidden'>
                    {session?.user ? (
                         // displayed when the user is authenticated
                         <div className='flex gap-3 md:gap-5'>
                              <Link href='/createprompt' className='black_btn'>
                                   Create Post
                              </Link>
                              <button
                                   type='button'
                                   onClick={signOut}
                                   className='outline_btn'
                              >
                                   Sign Out
                              </button>
                              <Link href='/profile'>
                                   <Image
                                        src={session?.user?.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='Profile Photo'
                                   />
                              </Link>
                         </div>
                    ) : (
                         // displayed when the user is not authenticated
                         <>
                              {providers &&
                                   Object.values(providers).map((provider) => {
                                        return (
                                             <button
                                                  type='button'
                                                  key={provider.name}
                                                  onClick={() =>
                                                       signIn(provider.id)
                                                  }
                                                  className='black_btn'
                                             >
                                                  Sign In
                                             </button>
                                        );
                                   })}
                         </>
                    )}
               </div>

               {/* mobile navigation */}
               <div className='sm:hidden flex relative'>
                    {session?.user ? (
                         // displayed when the user is authenticated on mobile
                         <div className='flex'>
                              <Image
                                   src={session?.user?.image}
                                   width={37}
                                   height={37}
                                   className='rounded-full'
                                   onClick={() => {
                                        setToggleDropdown((prev) => !prev);
                                   }}
                                   alt='Profile Photo'
                              />
                              {toggleDropdown && (
                                   // dropdown menu for mobile
                                   <div className='dropdown'>
                                        <Link
                                             href='/profile'
                                             className='dropdown_link'
                                             onClick={() =>
                                                  setToggleDropdown(false)
                                             }
                                        >
                                             My Profile
                                        </Link>
                                        <Link
                                             href='/createprompt'
                                             className='dropdown_link'
                                             onClick={() =>
                                                  setToggleDropdown(false)
                                             }
                                        >
                                             Create Prompt
                                        </Link>
                                        <button
                                             type='button'
                                             onClick={() => {
                                                  setToggleDropdown(false);
                                                  signOut();
                                             }}
                                             className='mt-5 w-full black_btn'
                                        >
                                             Sign Out
                                        </button>
                                   </div>
                              )}
                         </div>
                    ) : (
                         // displayed when the user is not authenticated on mobile
                         <>
                              {providers &&
                                   Object.values(providers).map((provider) => {
                                        return (
                                             <button
                                                  type='button'
                                                  key={provider.name}
                                                  onClick={() =>
                                                       signIn(provider.id)
                                                  }
                                                  className='black_btn'
                                             >
                                                  Sign In
                                             </button>
                                        );
                                   })}
                         </>
                    )}
               </div>
          </nav>
     );
};

// export the Nav component as the default export
export default Nav;
