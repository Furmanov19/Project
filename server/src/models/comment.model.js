const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    comment: { type: String, require: true },
    executorId: { type: mongoose.Schema.Types.ObjectId, ref: "Executor" }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Comment", schema);
