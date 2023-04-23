import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please Enter Name"],
   },
   email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: [true, "Email Already Exists"],
      validate: validator.isEmail
   },
   password: {
      type: String,
      required: [true, "Please Enter Password"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false,
   },
   city: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   country: {
      type: String,
      required: true,
   },
   pinCode: {
      type: Number,
      required: true,
   },
   role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
   },
   avatar: {
      public_id: String,
      url: String,
   },
   otp: Number,
   otp_expire: Date,
})


schema.pre("save", async function (next) {
   // this.password is the password from the model

   //if password field is modified then only hash it.
   if(!this.isModified("password")) return next();

   const hashedpassword = await bcrypt.hash(this.password, 10);
   this.password = hashedpassword;
})

schema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}

schema.methods.generateToken = function () {
   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
   });
}



export const User = mongoose.model("User", schema);