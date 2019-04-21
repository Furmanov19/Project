const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailConfirmed: { type: Boolean, required: false },
    blocking: {
      isBlocked: { type: Boolean, default: false, required: false },
      reason: { type: String, default: "", required: false }
    },
    attemts: { type: Number, required: false },
    code: { type: String, required: false },
    phone: { type: String, require: false },
    googleId: { type: String, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: false, lowercase: true },
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: false }
    ]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    console.log(error);
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", schema);
