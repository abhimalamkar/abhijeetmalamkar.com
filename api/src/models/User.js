import mongoose from "mongoose";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

// TODO: add uniquess and email validation
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    passwordHash: String,
    confirmed: Boolean,
    confirmationToken: { type: String, default: "" },
    name: String,
    provider: String,
    provider_id: String,
    token: String,
    provider_pic: String,
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

schema.methods.setGoogleData = function setGoogleData(data) {
  this.name = data.name;
  this.provider = data.provider;
  this.provider_id = data.provider_id;
  this.provider_pic = data.provider_pic;
  this.token = data.token;
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`;
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed,
      profile_pic: this.provider_pic,
      name: this.name
    },
    process.env.JWT_SECRET
  );
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT(),
  };
};

schema.methods.follow = function(user_id) {
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id);
  }
  return this.save();
};
schema.methods.addFollower = function(fs) {
  this.followers.push(fs);
};

schema.plugin(uniqueValidator, { message: "This email is already taken" });

export default mongoose.model("User", schema);
