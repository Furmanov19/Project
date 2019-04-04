const httpStatus = require("http-status");
const orderService = require("./orders.services");


module.exports.createOrder = (req, res) => {
  orderService
    .createOrder(req.body)
    .then(order => res.status(httpStatus.CREATED).json(order))
    .catch(err => next(err));
};
module.exports.getOrders = (req, res) => {
  if(req.user.role=="executor"){
    orderService
      .getExecutorOrders(req.user.id)
      .then(orders => {res.json(orders); console.log(orders);})
      .catch(err => next(err));
  } else{
    orderService
      .getUserOrders(req.user.id)
      .then(orders => {res.json(orders); console.log(orders);})
      .catch(err => next(err));
  }
};
module.exports.getOrder = (req, res) => {
  if(req.user.role=="executor"){
    orderService
      .getExecutorOrder(req.params.id,req.user.id)
      .then(orders => {res.json(orders); console.log(orders);})
      .catch(err => next(err));
  } else{
    orderService
      .getUserOrder(req.params.id,req.user.id)
      .then(orders => {res.json(orders); console.log(orders);})
      .catch(err => next(err));
  }
};
module.exports.deleteUserOrder = (req, res) => {
  orderService
  .deleteUserOrder(req.params.id,req.user.id)
  .then(order=>{res.json(order);console.log("done");})
  .catch(err=>console.log(err));
};


module.exports.updateOrderById = (req, res) => {
  if(req.user.role=="executor"){
    orderService
    .updateOrderByExecutor(req.params.id,req.user.id,req.body)
    .then(order=>{res.json(order);console.log("done");})
    .catch(err=>console.log(err));
  } else {
    orderService
    .updateOrderByUser(req.params.id,req.user.id,req.body)
    .then(order=>{res.json(order);console.log("done");})
    .catch(err=>console.log(err));
  }
};

