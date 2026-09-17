/* Imported elements */
import mongoose from "mongoose";
import generateGravatarUrl from "../utils/gravetar.js";


/* user Schema created */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required:true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    required: false,
    /* Add gravetar as default */
    default: function () {
      return generateGravatarUrl(this.email);
    },
  }
}, { timestamps: true })


/* userModel created */
const userModel = mongoose.model("user", userSchema);


export default userModel;
