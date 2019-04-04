const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");

const nodemailer = require("nodemailer");
async function register(data) {
  const {logo, name, email, discription, addres, services, orders, password, role="executor",emailConfirmed=false,attemts=5  } = data;
  let code=Math.floor(100000 + Math.random() * 900000);

  const output =`
    <p>You have a new contact request</p>
    <h3>Details</h3>
    <ul>
      <li>${name}</li>
      <li>${role}</li>
    </ul>
    <p>Your confirm code is ${code}</p>
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

  const executor = new Executor({
    logo,
    name,
    email,
    emailConfirmed,
    attemts,
    code,
    discription,
    addres,
    services,
    orders,
    password,
    role
  });
  await executor.save();
  const savedExecutor =await Executor.findOne({email});
  const res = {
    _id:savedExecutor._id,
    role:savedExecutor.role
  }
  return res;
}

async function confirm( { code,email } ) {
  const executor = await Executor.findOne( { email } );
  let count = executor.attemts;

  if(executor.code === code) {
    await Executor.findOneAndUpdate( { code },{
      $set: {
        emailConfirmed: true
      },
      $unset: {
        attemts: { $exist: true },
        code: { $exist: true }
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
  else if ( count == 1 ) {
    await Executor.findOneAndRemove( { email } );
    throw new Error ( 'Executor deleted' );
  }
  else {
    await Executor.findOneAndUpdate( { email },{
      $set: {
        attemts: --count
      }
    });
    throw new Error( 'Invalid code' );
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
  const executor = await Executor.findOne( { name } )

    if ( executor === null ) throw new Error ( "Executor not found" );
    if ( executor.emailConfirmed === false ) throw new Error ( "Executor not confirmd" );
    
    let success = await user.comparePassword(password);

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
      user: {
        _id: executor._id,
        role: executor.role
        // emailConfirmed:executor.emailConfirmed
      }
    };
}





async function get(_id ) {
  return Executor.find({emailConfirmed:true});
}
async function getById(_id ) {
    return Executor.findById(_id);
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



async function logout({ token }) {
  return true;
}


async function setExecutorRate(data,executor_id) {
  return await Executor.findOneAndUpdate({_id:executor_id},{$push:{rate:data}}, { upsert: true, new: true });
}
async function takeExecutorRate(executor_id) {
  const executor = await Executor.findOne({_id:executor_id});
  let arrRates= await Executor.find({_id:executor_id},{'rate.rate':1}).then((obj)=>{ console.log(obj); return obj[0].rate});
  let averageRate=executor.AverageRate(arrRates);
  console.log(averageRate);
  return averageRate;
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
  logout,
  register,
  confirm,
  getById,
  updateById,
  deleteById,
  setExecutorRate,
  takeExecutorRate,
  setExecutorComment,
  takeExecutorComments
};
