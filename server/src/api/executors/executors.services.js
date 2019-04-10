const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");
const nodemailer = require("nodemailer");
const service = require('../../services/calculateValues.service');
async function register(data) {
  const {logo, name, email, discription, address, services, orders, password, role="executor",emailConfirmed=false,averageRate=0} = data;
  let averagePrice=service.averagePrice(services);
  const token = jwt.sign(
    { id: email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );

  const executor = new Executor({
    logo,
    name,
    email,
    emailConfirmed,
    verifyToken:token,
    averageRate,
    discription,
    address,
    averagePrice,
    services,
    orders,
    password,
    role
  });
  await executor.save();



  const link =`<a href="http://localhost:3000/confirm?verifyToken=${token}">finish registration</a>`;
  
  const output =`
    <p>You have a new contact request</p>
    <h3>Details</h3>
    <ul>
      <li>${name}</li>
    </ul>
    <p>Follow ${link}</p>
  `;

  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:config.nodemailer.user,
      pass:config.nodemailer.pass
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

  const savedExecutor =await Executor.findOne({email});
  const res = {
    _id:savedExecutor._id,
    role:savedExecutor.role
  }
  return res;
}

async function confirm( { verifyToken } ) {
  const executor = await Executor.findOne( { verifyToken} );
  if ( executor === null ) throw new Error ( "Executor not found" );
  
  if(executor.verifyToken === verifyToken) {
    await Executor.findOneAndUpdate( { verifyToken },{
      $set: {
        emailConfirmed: true
      },
      $unset: {
        verifyToken: { $exist: true }
      }
    });

    const token = jwt.sign(
      { id: executor._id, role: executor.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    return {
      token: token,
      executor: {
        _id: executor._id,
        role: executor.role
        // emailConfirmed:executor.emailConfirmed
      }
    };
  }
}

async function loadExecutor( executor ) {
  return {
    _id: executor._id,
    role: executor.role
    // emailConfirmed:user.emailConfirmed
  }
}

async function authenticate( { name, password } ) {
  const executor = await Executor.findOne( { name } );

  if ( executor === null ) throw new Error ( "Executor not found" );
  if ( executor.emailConfirmed === false ) throw new Error ( "Executor not confirmd" );

  let success = await executor.comparePassword(password);

  if ( success === false ) throw new Error ( "Password is incorrect" );

  const token = jwt.sign (
    { 
      id: executor._id,
      role: executor.role
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );

  return {
    token: token,
    executor: {
      _id: executor._id,
      role: executor.role
      // emailConfirmed:executor.emailConfirmed
    }
  };
}

async function get({page,perPage,search,sortByPrice,sortByAddress,sortByRate,sortByPopularity}) {
  let nameReg ="";
  let addressReg="";

  if (search === "" || search === null || search === undefined) {
    nameReg = ".*";
  } else {
    nameReg = `.*${search}.*`;
  }

  if (sortByAddress === "") {
    addressReg=".*";
  }else {
    addressReg = `.*${sortByAddress}.*`;
  }

  let averagePrice=(sortByPrice!=="")?sortByPrice:0;
  let popularity=(sortByPopularity!=="")?sortByPopularity:0;

  const query={
    emailConfirmed:true,
    name:{ $regex: nameReg, $options: 'i'},
    address:{ $regex: addressReg, $options: 'i'},
  }
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 1,
    select: "name",
    sort:{averagePrice:averagePrice,popularity:popularity}
  };

  const executors=await Executor.paginate(query,options);

  return executors
}

async function updateById(_id,data) {
      return Executor.findByIdAndUpdate(_id, {$set:data},{new:true}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
    });
}

async function deleteById(_id) {
      return Executor.findOneAndRemove({_id}, function(err, result){
        if(err){
            throw err; 
        }
        console.log(result); 
    });
}



async function setExecutorComment(data,executor_id) {
  return await Executor.findOneAndUpdate({_id:executor_id},{$push:{comments:data}}, { upsert: true, new: true });
}
async function takeExecutorComments(executor_id) {
  //const executor = await Executor.findOne({_id:executor_id});
  let mas= await Executor.find({_id:executor_id},{'comments.customer_id':1,'comments.comment':1}).then((obj)=>{console.log(obj); return obj[0].comments});
  return mas;
}

module.exports = {
  get,
  authenticate,
  loadExecutor,
  register,
  confirm,
  updateById,
  deleteById,
  setExecutorComment,
  takeExecutorComments
};
