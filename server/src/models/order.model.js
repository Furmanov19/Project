const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  { 
    address:{type: String, required: false, lowercase: true },
    type:{type: String, required: false},
    apartments:{
      smallRoom:{type:Number},
      largeRoom:{type:Number},
      toilet:{type:Number}
    },
    date:{type: Date, required: false},
    time:{type: String, required: false},
    regularity:{type: String, required: false},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    executor_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'Executor', required: false },
    status: { type: String, required: false},
    price:{type: Number}
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

module.exports = mongoose.model("Order", schema);
