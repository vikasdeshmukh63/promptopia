// import necessary functions and modules
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read) endpoint for fetching prompts by a specific creator ID
export const GET = async (req, { params }) => {
     try {
          // connect to the database
          connectToDB();

          // find prompts with the specified creator ID and populate the 'creator' field for each
          const prompts = await Prompt.find({ creator: params.id }).populate(
               'creator'
          );

          // return the list of prompts as a JSON response with a 200 status
          return new Response(JSON.stringify(prompts), { status: 200 });
     } catch (error) {
          // if an error occurs, return a 500 status response
          return new Response('Failed to fetch Prompts by creator', {
               status: 500
          });
     }
};
