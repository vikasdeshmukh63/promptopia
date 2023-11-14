// import necessary functions and modules
import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read) endpoint
export const GET = async (req, { params }) => {
     try {
          // connect to the database
          await connectToDB();

          // find the prompt by ID and populate the 'creator' field
          const prompt = await Prompt.findById(params.id).populate('creator');

          // if the prompt is not found, return a 404 response
          if (!prompt) {
               return new Response('Prompt Not Found', { status: 404 });
          }

          // return the prompt as a JSON response with a 200 status
          return new Response(JSON.stringify(prompt), { status: 200 });
     } catch (error) {
          // if an error occurs, return a 500 status response
          return new Response('Failed to fetch prompt', { status: 500 });
     }
};

// PATCH (update) endpoint
export const PATCH = async (req, { params }) => {
     // extract prompt and tag from the request body
     const { prompt, tag } = await req.json();

     try {
          // connect to the database
          await connectToDB();

          // find the existing prompt by ID
          const existingPrompt = await Prompt.findById(params.id);

          // if the prompt is not found, return a 404 response
          if (!existingPrompt) {
               return new Response('Prompt not found', { status: 404 });
          }

          // update the existing prompt with new values
          existingPrompt.prompt = prompt;
          existingPrompt.tag = tag;

          // save the updated prompt to the database
          await existingPrompt.save();

          // return the updated prompt as a JSON response with a 200 status
          return new Response(JSON.stringify(existingPrompt), { status: 200 });
     } catch (error) {
          // if an error occurs, return a 500 status response
          return new Response('Failed to update prompt', { status: 500 });
     }
};

// DELETE (delete) endpoint
export const DELETE = async (req, { params }) => {
     try {
          // connect to the database
          await connectToDB();

          // find and delete the prompt by ID
          await Prompt.findByIdAndDelete(params.id);

          // return a success message with a 200 status
          return new Response('Prompt Deleted Successfully', { status: 200 });
     } catch (error) {
          // if an error occurs, log it and return a 500 status response
          console.log(error);
          return new Response('Failed to Delete Prompt', { status: 500 });
     }
};
