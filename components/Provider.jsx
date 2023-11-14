'use client'
// in this we are utilizing the browsers capabilities hence we need to make it client side component

// import necessary React components and utilities
import React from 'react';
import { SessionProvider } from 'next-auth/react';

// define the provider component
const Provider = ({ children, session }) => {
     //render the SessionProvider with the provided session
     return <SessionProvider session={session}>{children}</SessionProvider>;
};

// export the Provider component as the default export
export default Provider;
