const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  { 
    addres:{type: String, required: false, lowercase: true },
    type:{type: String, required: false},
    discription:{type: String, required: true},//подумать,добавить сортировки в модель
    date:{type: String, required: false},
    regularity:{type: String, required: false},
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    executor_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'Executor', required: true },
    status: { type: String, required: false}
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
