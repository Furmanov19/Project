const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const schema = new mongoose.Schema(
  {
    city: { type: String, required: false, lowercase: true },
    address: { type: String, required: false, lowercase: true },
    email: { type: String, required: false, lowercase: true },
    type: { type: String, required: false },
    apartments: {
      smallRooms: { type: Number },
      largeRooms: { type: Number },
      toilets: { type: Number }
    },
    regularity: { type: String, required: false, lowercase: true },
    duration: { type: String, required: false, lowercase: true },
    date: { type: Date, required: false },
    time: { type: String, required: false },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    executor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Executor",
      required: false
    },
    status: { type: String, required: false },
    price: { type: Number }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Order already exist"));
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
module.exports = mongoose.model("Order", schema);
