const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const Executor = require("../../models/executor.model");
const Status = require("../../enums/status.enum");

async function createOrder({ addres, type, discription,date,regularity,status=Status.Pending,customer_id,executor_id }) {
  const order = await new Order({
    addres,
    type,
    discription,
    date,
    regularity,
    status,
    customer_id,
    executor_id
  });
  await User.findOneAndUpdate({_id:customer_id},{$push:{orders:order}}, { upsert: true, new: true });
  await Executor.findOneAndUpdate({_id:executor_id},{$push:{orders:order}}, { upsert: true, new: true });
  return order.save();
}
async function getUserOrders(user_id) {
  return await Order.find({ customer_id: user_id})
    .populate("customer_id")
    .exec();
}

async function getExecutorOrders(executor_id) {
  return await Order.find({ executor_id: executor_id})
    .populate("executor_id")
    .exec();
}


async function getUserOrder(order_id,user_id) {
  return await Order.find({_id:order_id,customer_id: user_id})
    .populate("customer_id")
    .exec();
}

async function getExecutorOrder(order_id,executor_id) {
  return await Order.find({_id:order_id,executor_id: executor_id})
    .populate("executor_id")
    .exec();
}


async function deleteUserOrder(order_id,user_id) {
  let executorId =0;
  await Order.findOne({_id: order_id},(err,val)=>{
    if(err) return console.log(err);
    let {executor_id}=val;
    executorId=executor_id;
  });
  
  
  await Executor.findOneAndUpdate({_id:executorId},{$pull:{orders:order_id}},{ safe: true, upsert: true },(err, result)=>{
      if(err){
        throw err;
      }
    }
  );

  await User.findOneAndUpdate({_id:user_id},{$pull:{orders:order_id}},{ safe: true, upsert: true },(err, result)=>{
      if(err){
        throw err;
      }
    }
  );

  return  await Order.findOneAndRemove({_id:order_id},(err, result)=>{
      if(err){
        throw err;
      }
    }
  );

}
async function updateOrderByUser(order_id,user_id,data) {
  return await Order.findOneAndUpdate({_id:order_id,customer_id:user_id}, {$set:data},{new:true},(err, result)=>{
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
  });
}
async function updateOrderByExecutor(order_id,executor_id,status) {
  return await Order.findOneAndUpdate({_id:order_id,executor_id:executor_id}, {$set:status},{new:true}, function(err, result){
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
  });
}
module.exports = {
  createOrder,
  getUserOrder,
  getExecutorOrder,
  getUserOrders,
  getExecutorOrders,
  deleteUserOrder,
  updateOrderByUser,
  updateOrderByExecutor
};
