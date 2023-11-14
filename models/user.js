// import necessary components from mongoose
import { Schema, model, models } from 'mongoose';

// define the mongoose schema for the user model
const UserSchema = new Schema({
     // email field (unique and required)
     email: {
          type: String,
          unique: [true, 'Email already exists!'],
          required: [true, 'Email is Required']
     },
     // username field (required, with regex pattern validation)
     username: {
          type: String,
          required: [true, 'Username is required'],
          match: [
               /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
               'Username invalid, it should contain 8-20 alphanumeric letters and be unique!'
          ]
     },
     // image field (optional)
     image: {
          type: String
     }
});

// create the user model or retrieve an existing model if it already exists
const User = models.User || model("User",UserSchema);

// export the User model
export default User;
