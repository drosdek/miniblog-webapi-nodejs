const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: { type: String, unique: true, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define o parâmetro createdAt igual à hora atual
categorySchema.pre("save", (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Author", categorySchema);
