const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const Executor = require("../../models/executor.model");
const Status = require("../../enums/status.enum");
const mailService = require("../../services/mail.service.js");

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
  const user = await User.findOne({ _id: customer_id });
  user &&
    (await User.findOneAndUpdate(
      { _id: customer_id },
      { $push: { orders: order } },
      { upsert: true, new: true }
    ));
  user && mailService.mailAboutNewOrderForUser(order, user.email);
  const executor = await Executor.findOne({ _id: executor_id });
  executor &&
    (await Executor.findOneAndUpdate(
      { _id: executor_id },
      { $push: { orders: order }, $set: { popularity: ++executor.popularity } },
      { upsert: true, new: true }
    ));
  executor && mailService.mailAboutNewOrderForExecutor(order, executor.email);
  return await order.save();
}
async function getUserOrders(user_id, req_query) {
  const { page, perPage } = req_query;
  const query = {
    customer_id: user_id
  };
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 3,
    select:
      "city address email type apartments regularity duration date time status price"
  };

  const userOrders = await Order.paginate(query, options);
  return userOrders;
}

async function getExecutorOrders(executor_id, req_query) {
  const { page, perPage } = req_query;
  const query = {
    executor_id
  };
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 3,
    select:
      "city address email type apartments regularity duration date time status price"
  };
  const executorOrders = await Order.paginate(query, options);
  return executorOrders;
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

async function updateOrderById(
  executor_id,
  { order_id, order_status, reason }
) {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: order_id, executor_id: executor_id },
    { $set: { status: order_status, rejectionReason: reason } },
    { new: true }
  );
  return updatedOrder;
}

module.exports = {
  createOrder,
  getUserOrders,
  getExecutorOrders,
  deleteUserOrder,
  updateOrderById
};
