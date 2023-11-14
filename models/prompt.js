// import necessary components from mongoose
import { Schema, model, models } from 'mongoose';

// define the mongoose schema for the prompt model
const PromptSchema = new Schema({
     // reference to the creator (User model)
     creator: {
          type: Schema.Types.ObjectId,
          ref: 'User'
     },
     // prompt text (required)
     prompt: {
          type: String,
          required: [true, 'Prompt is Required']
     },
     // tag for the prompt (required)
     tag: {
          type: String,
          required: [true, 'Tag is Required']
     }
});

// create the prompt model or retrieve an existing model if it already exists
const Prompt = models.Prompt || new model('Prompt', PromptSchema);

// export the prompt model
export default Prompt;
