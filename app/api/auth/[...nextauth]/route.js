// import NextAuth library
import NextAuth from 'next-auth/next';

// import GoogleProvider from next-auth/providers
import GoogleProvider from 'next-auth/providers/google';

// import MongoDB connection function and User model
import { connectToDB } from '@utils/database';
import User from '@models/user';

// import dotenv for environment variables
import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

// define NextAuth handler
const handler = NextAuth({
     // configure authentication providers (in this case, Google)
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
     ],
     // configure callbacks for session and sign-in
     callbacks: {
          // callback for modifying the session object
          async session({ session }) {
               // find the user in the database using the email from the session
               const sessionUser = await User.findOne({
                    email: session.user.email
               });

               // set the user id in the session
               session.user.id = sessionUser._id.toString();

               // return the modified session object
               return session;
          },
          // callback for handling sign-in
          async signIn({ profile }) {
               try {
                    // connect to MongoDB
                    await connectToDB();

                    // check if the user already exists in the database
                    const userExists = await User.findOne({
                         email: profile.email
                    });

                    // if the user does not exist, create a new user
                    if (!userExists) {
                         await User.create({
                              email: profile.email,
                              username: profile.name
                                   .replace(' ', '')
                                   .toLowerCase(),
                              image: profile.picture
                         });
                    }

                    // return true to indicate successful sign-in
                    return true;
               } catch (error) {
                    // log and return false if an error occurs
                    console.log(error);
                    return false;
               }
          }
     }
});

// export the handler for both GET and POST requests
export { handler as GET, handler as POST };
