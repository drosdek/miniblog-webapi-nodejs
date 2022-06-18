const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Sets the createdAt parameter equal to the current time
AuthorSchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

AuthorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("author", AuthorSchema);
