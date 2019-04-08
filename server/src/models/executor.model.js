const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema(
  {
    logo:{type: String, required: false },
    name: { type: String, required: true ,unique:false, select:true},
    email: { type: String, required: false },
    emailConfirmed:{type:Boolean, required: false},
    verifyToken:{type:String, required: false},
    discription:{type: String, required: false },
    addres:{type: String, required: false },
    services:{
      standart:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      general:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      afterRepair:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      carpetDryCleaning:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      office:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      furniture:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      industrialСleaning:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
      pool:{
        smallRoom:{type: Number, required: false},
        largeRoom:{type: Number, required: false},
        toilet:{type: Number, required: false}
      },
    },
    orders:[{type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false}],
    password: { type: String, required: true},//, select: true 
    role: { type: String, required: false, lowercase: true },
    rate:[{
      customer_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false},
      rate:{type: Number, required: false }
    }],
    comments:[{
      customer_id:{type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false},
      comment:{type: String, required: false }
    }]
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
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      if ( err ) { return reject( err ) }
      return resolve(success);
    });
  });
};

schema.methods.AverageRate=function(rateArray){
  return new Promise((resolve, reject) => {
    try{
      
      let averageRate =rateArray.reduce(function (p, c) {
        return p + c.rate;
      },0) / rateArray.length;

      return resolve(averageRate);
    }catch(err){
      return reject(err);
    }
  });
};


schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Executor", schema);
