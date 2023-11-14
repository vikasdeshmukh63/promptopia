// import necessary functions and modules
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read) endpoint for fetching all prompts
export const GET = async (req) => {
     try {
          // connect to the database
          connectToDB();

          // find all prompts and populate the 'creator' field for each
          const prompts = await Prompt.find({}).populate('creator');

          // return the list of prompts as a JSON response with a 200 status
          return new Response(JSON.stringify(prompts), { status: 200 });
     } catch (error) {
          // if an error occurs, return a 500 status response
          return new Response('Failed to fetch all Prompts', { status: 500 });
     }
};
