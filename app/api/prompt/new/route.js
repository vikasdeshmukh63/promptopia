// import necessary functions and modules
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// POST (create) endpoint
export const POST = async req => {
     // extract userId, prompt, and tag from the request body
     const { userId, prompt, tag } = await req.json();

     try {
          // connect to the database
          await connectToDB();

          // create a new prompt with the provided data
          const newPrompt = new Prompt({ creator: userId, prompt, tag });

          // save the newly created prompt to the database
          await newPrompt.save();

          // return the newly created prompt as a JSON response with a 201 status
          return new Response(JSON.stringify(newPrompt), {
               status: 201
          });
     } catch (error) {
          // if an error occurs, return a 500 status response
          return new Response('Failed to create a new Prompt', { status: 500 });
     }
};
