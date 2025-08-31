import mongoose from "mongoose";

const SignupSchema = mongoose.Schema(
       {
              fullname: {
                     type: String,
                     required: true,
              },
              username: {
                     type: String,
                     required: true,
                     unique: true,
              },
              email: {
                     type: String,
                     required: true,
                     unique: true,
                     match: [/.+@.+\..+/, 'Please enter a valid email address'],
              },
              password: {
                     type: String,
                     required: true,
                     minLength: 5,
              },
              gender: {
                     type: String,
                     required: true,
                     enum: ["male", "female"],
              },
              profilepic: {
                     type: String,
                     default: "",
              },
       },
       { timestamps: true }
);

const User = mongoose.model("User", SignupSchema);
export default User;
