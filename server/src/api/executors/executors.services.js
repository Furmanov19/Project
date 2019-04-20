const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");
const Comment = require("../../models/comment.model");
const nodemailer = require("nodemailer");
const service = require("../../services/calculateValues.service");

async function register(data) {
  const {
    logo,
    name,
    email,
    discription,
    address,
    services,
    orders,
    password,
    role = "executor",
    emailConfirmed = false,
    averageRate = 0
  } = data;
  let averagePrice = service.averagePrice(services);
  const token = jwt.sign({ id: email }, config.jwt.secret, {
    expiresIn: config.jwt.expiration
  });

  const executor = new Executor({
    logo,
    name,
    email,
    emailConfirmed,
    verifyToken: token,
    averageRate,
    discription,
    address,
    averagePrice,
    blocking: {
      isBLocked: false,
      reason: ""
    },
    services,
    orders,
    password,
    role
  });
  await executor.save();

  const link = `<a href="http://localhost:3000/confirm?verifyToken=${token}">finish registration</a>`;

  const output = `
    <p>You have a new contact request</p>
    <h3>Details</h3>
    <ul>
      <li>${name}</li>
    </ul>
    <p>Follow ${link}</p>
  `;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.nodemailer.user,
      pass: config.nodemailer.pass
    }
  });

  let mailOptions = {
    from: '"Artem Furmanov" <artem.s.furman@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);

  const savedExecutor = await Executor.findOne({ email });
  const res = {
    _id: savedExecutor._id,
    role: savedExecutor.role
  };
  return res;
}

async function confirm({ verifyToken }) {
  const executor = await Executor.findOne({ verifyToken });
  if (executor === null) throw new Error("Executor not found");

  if (executor.verifyToken === verifyToken) {
    await Executor.findOneAndUpdate(
      { verifyToken },
      {
        $set: {
          emailConfirmed: true
        },
        $unset: {
          verifyToken: { $exist: true }
        }
      }
    );

    const token = jwt.sign(
      { id: executor._id, role: executor.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );
    const data = executor.toObject();
    const { password: executorPassword, ...executorWithoutPassword } = data;

    return {
      token: token,
      executor: executorWithoutPassword
    };
  }
}

async function loadExecutor(executor) {
  const data = executor.toObject();
  const { password: executorPassword, ...executorWithoutPassword } = data;

  return {
    executor: executorWithoutPassword
  };
}

async function authenticate({ name, password }) {
  const executor = await Executor.findOne({ name });

  if (executor === null) throw new Error("Executor not found");
  if (executor.emailConfirmed === false)
    throw new Error("Executor not confirmd");

  let success = await executor.comparePassword(password);

  if (success === false) throw new Error("Password is incorrect");

  const token = jwt.sign(
    {
      id: executor._id,
      role: executor.role
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );
  if (executor.blocking.isBlocked) {
    return {
      name: executor.name,
      isBlocked: executor.blocking.isBlocked,
      reason: executor.blocking.reason
    };
  }

  return {
    token: token,
    executor: executor
  };
}

async function get({
  page,
  perPage,
  search,
  sortByPrice,
  sortByAddress,
  sortByRate,
  sortByPopularity
}) {
  let nameReg = "";
  let addressReg = "";

  if (search === "" || search === null || search === undefined) {
    nameReg = ".*";
  } else {
    nameReg = `.*${search}.*`;
  }

  if (sortByAddress === "") {
    addressReg = ".*";
  } else {
    addressReg = `.*${sortByAddress}.*`;
  }

  let averagePrice = sortByPrice !== "" ? sortByPrice : 0;
  let popularity = sortByPopularity !== "" ? sortByPopularity : 0; //доделать

  const query = {
    emailConfirmed: true,
    name: { $regex: nameReg, $options: "i" },
    address: { $regex: addressReg, $options: "i" }
  };
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 1,
    select:
      "name email emailConfirmed blocking discription role _id services averageRate averagePrice",
    sort: { averagePrice: averagePrice, popularity: popularity }
  };

  const executors = await Executor.paginate(query, options);

  return executors;
}

async function blockExecutor(_id, { reason }) {
  return Executor.findByIdAndUpdate(
    _id,
    { $set: { "blocking.isBlocked": true, "blocking.reason": reason } },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
    }
  );
}

async function unblockExecutor(_id) {
  return Executor.findByIdAndUpdate(
    _id,
    { $set: { "blocking.isBlocked": false, "blocking.reason": "" } },
    { new: true },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
    }
  );
}

async function editExecutor(
  _id,
  { name, discription, password, services, address }
) {
  const executor = await Executor.findOne({ _id });
  let savedExecutor = {};
  console.log(executor);
  console.log(name, discription, services, address, password);
  if (password) {
    let unchangedPassword = await executor.comparePassword(password);
    if (unchangedPassword) {
      savedExecutor = await Executor.findByIdAndUpdate(
        _id,
        {
          $set: {
            name: name ? name : executor.name,
            discription: discription ? discription : executor.discription,
            services: services ? services : executor.services,
            address: address ? address : executor.address
          }
        },
        { new: true }
      );
    } else {
      executor.name = name ? name : executor.name;
      executor.discription = discription ? discription : executor.discription;
      executor.services = services ? services : executor.services;
      executor.address = address ? address : executor.address;
      executor.password = password;
      savedExecutor = await executor.save();
    }
  } else {
    savedExecutor = await Executor.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: name ? name : executor.name,
          discription: discription ? discription : executor.discription,
          services: services ? services : executor.services,
          address: address ? address : executor.address
        }
      },
      { new: true }
    );
  }
  const data = savedExecutor.toObject();
  const { password: executorPassword, ...executorWithoutPassword } = data;
  return executorWithoutPassword;
}

async function postComment(executor_id, data) {
  const {userName,userComment } =data;
  const comment =new Comment ({
    userName,
    comment:userComment,
    executorId:executor_id
  });
  const savedComment = comment.save().then(({ _id }) => Comment.findById(_id));
  await Executor.findOneAndUpdate({_id:executor_id},{
    $push:{
      comments:savedComment
    }
  });
  return savedComment;
}

async function getExecutorComments(executor_id,req_query) {
  const { page, perPage} =req_query;
  const query ={
    executorId:executor_id,
  }
  const options = {
    page: parseInt(page,10) || 1,
    limit: parseInt(perPage,10) || 5,
    select : "userName comment created_at",
    sort :{"created_at":-1}
  }
  const comments =await Comment.paginate(query,options);
  console.log(comments);
  return comments;
}

module.exports = {
  get,
  blockExecutor,
  unblockExecutor,
  editExecutor,
  authenticate,
  loadExecutor,
  register,
  confirm,
  postComment,
  getExecutorComments
};
