const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");

const nodemailer = require("nodemailer");

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

async function authenticate({username,password}) {
  try {

    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();

    if (executor === null) throw "Executor not found";
    if (executor.emailConfirmed === false) throw "Executor not confirmd";
    let success = await executor.comparePassword(password);

    if (success === false) throw "Username or password is incorrect";

    const data = executor.toObject();

    const token = jwt.sign(
      { id: data._id, role: data.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    const { password: userPassword, ...userWithoutPassword } = data;

    return {
      ...userWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function logout({ token }) {
  return true;
}

async function register(data) {
    const {logo, username,email, discription, addres, services, orders, password, role="executor",emailConfirmed=false } = data;
    let code=Math.floor(100000 + Math.random() * 900000);
    const output =`
      <p>You have a new contact request</p>
      <h3>Details</h3>
      <ul>
        <li>${username}</li>
        <li>${role}</li>
      </ul>
      <p>Your confirm code is ${code}</p>
    `;

    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'artem.s.furman@gmail.com',
        pass:'462450192f'
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
      username,
      discription,
      addres,
      services,
      orders,
      password,
      role,
      code,
      emailConfirmed
    });
    return executor.save().then(({ _id }) => Executor.findById(_id));
}
async function confirm({code}) {
  try{
    const executor = await Executor.findOneAndUpdate(
      {code},
      {
        $set:{emailConfirmed:true}
      }
    );
    return executor;
  }catch{
    return false;
  }
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
