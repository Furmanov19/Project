const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const Executor = require("../../models/executor.model");
const Status = require("../../enums/status.enum");

const nodemailer = require("nodemailer");

async function createOrder({
  city,
  address,
  type,
  email,
  date,
  time,
  apartments,
  regularity,
  duration,
  price,
  executor_id,
  customer_id
}) {
  const order = await new Order({
    city,
    address,
    email,
    type,
    date,
    time,
    apartments,
    regularity,
    duration,
    price,
    executor_id,
    customer_id
  });
  await User.findOneAndUpdate(
    { _id: customer_id },
    { $push: { orders: order } },
    { upsert: true, new: true }
  );
  await Executor.findOneAndUpdate(
    { _id: executor_id },
    { $push: { orders: order } },
    { upsert: true, new: true }
  );
  return await order.save();
}
async function getUserOrders(user_id, req_query) {
  const { page, perPage } = req_query;
  const query = {
    customer_id: user_id,
  };
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 5,
    select: "city address email type apartments regularity duration date time status price"
  };

  const userOrders = await Order.paginate(query, options);
  console.log(userOrders)
  return userOrders;
}

async function getExecutorOrders(executor_id, req_query) {
  const { page, perPage } = req_query;
  const query = {
    executor_id
  };
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 5,
    select: "city address email type apartments regularity duration date time status price"
  };
  const executorOrders = await Order.paginate(query,options);
  return executorOrders;
}

async function getUserOrder(order_id, user_id) {
  return await Order.find({ _id: order_id, customer_id: user_id })
    .populate("customer_id")
    .exec();
}

async function getExecutorOrder(order_id, executor_id) {
  return await Order.find({ _id: order_id, executor_id: executor_id })
    .populate("executor_id")
    .exec();
}

async function deleteUserOrder(order_id, user_id) {
  let executorId = 0;
  await Order.findOne({ _id: order_id }, (err, val) => {
    if (err) return console.log(err);
    let { executor_id } = val;
    executorId = executor_id;
  });

  await Executor.findOneAndUpdate(
    { _id: executorId },
    { $pull: { orders: order_id } },
    { safe: true, upsert: true },
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  await User.findOneAndUpdate(
    { _id: user_id },
    { $pull: { orders: order_id } },
    { safe: true, upsert: true },
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  return await Order.findOneAndRemove({ _id: order_id }, (err, result) => {
    if (err) {
      throw err;
    }
  });
}
async function updateOrderByUser(order_id, user_id, data) {
  return await Order.findOneAndUpdate(
    { _id: order_id, customer_id: user_id },
    { $set: data },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
    }
  );
}
async function updateOrderByExecutor(order_id, executor_id, status) {
  return await Order.findOneAndUpdate(
    { _id: order_id, executor_id: executor_id },
    { $set: status },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
    }
  );
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
