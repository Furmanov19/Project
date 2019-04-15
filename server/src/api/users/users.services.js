const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const User = require("../../models/user.model");

const nodemailer = require("nodemailer");

async function register(data) {
  const { name, email, phone,  password, orders,role="user",emailConfirmed=false,attemts=5 } = data;
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

  const user = new User({
    name,
    email,
    emailConfirmed,
    code,
    phone,
    password,
    role,
    orders,
    attemts
  });
  await user.save();
  const savedUser =await User.findOne({email}); 
  const res= {
    _id:savedUser._id,
    role:savedUser.role
    // emailConfirmed:savedUser.emailConfirmed,
    // email:savedUser.email
  }
  return res;
}

async function confirm( { code, email } ) {
    const user = await User.findOne( { email } );
    let count = user.attemts;

    if( user.code===code ) {
      await User.findOneAndUpdate( { code },{
        $set: {
          emailConfirmed: true
        },
        $unset: {
          attemts: { $exist: true },
          code: { $exist: true }
        }
      });
      const token = jwt.sign(
        { id: user._id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiration }
      );
      
      const data=user.toObject();
      const {password:userPassword ,code:userCode,attemts:userAttemts, ...clearUser} =data;
      
      return {
        token: token,
        user: clearUser
      };
    }
    else if ( count == 1 ) {
      await User.findOneAndRemove( { email } );
      throw new Error( 'User deleted' );
    }
    else {
      await User.findOneAndUpdate( { email },{
        $set: {
          attemts: --count
        }
      });
      throw new Error( 'Invalid code' );
    }
}

async function loadUser( user ) {
  const data=user.toObject();
  const {password:userPassword , ...userWithoutPassword} =data;
  
  return {
    user: userWithoutPassword
  };
}

async function authenticate( { name, password } ) {
    const user = await User.findOne( { name } );

    if ( user === null ) throw new Error ( "User not found" );
    if ( user.emailConfirmed === false ) throw new Error ( "User not confirmd" );
    
    let success = await user.comparePassword(password);

    if ( success === false ) throw new Error ( "Password is incorrect" );

    const data=user.toObject();

    const {password:userPassword , ...userWithoutPassword} =data;

    const token = jwt.sign (
      { 
        id: data._id,
        role: data.role
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );
    if (user.blocking.isBlocked) {
      return {
        name:user.name,
        isBlocked:user.blocking.isBlocked,
        reason:user.blocking.reason
      }
    }
    return {
      token: token,
      user: userWithoutPassword
    };
    // return {
    //   token: token,
    //   user: {
    //     _id: user._id,
    //     role: user.role
    //   }
    // };
}

async function get({ page,perPage,search }) {
  let nameReg ="";

  if (search === "" || search === null || search === undefined) {
    nameReg = ".*";
  } else {
    nameReg = `.*${search}.*`;
  }


  const query={
    emailConfirmed:true,
    name:{ $regex: nameReg, $options: 'i'}
  }
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 1,
    select: "name _id role blocking"
  };

  const users=await User.paginate(query,options);

  return users;
}

async function blockUser(_id, {reason}) {
  return User.findByIdAndUpdate(_id, {$set:{'blocking.isBlocked':true,'blocking.reason':reason}},{new:true}, function(err, result){
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
});
}

async function unblockUser(_id) {
  return User.findByIdAndUpdate(_id, {$set:{'blocking.isBlocked':false,'blocking.reason':""}},{new:true}, function(err, result){
    if(err){
        console.log(err);
    }
    console.log("RESULT: " + result);
});
}

async function editUser(_id, {name,phone,password}) {
  const user=await User.findOne({_id});
  console.log(user);
  let savedUser ={};
  if(password){
    console.log("пароль пришел");
    let unchangedPassword=await user.comparePassword(password);
    if(unchangedPassword){
      console.log("пароль не изменился");
      savedUser=await  User.findByIdAndUpdate(
        _id,
        { $set: 
          { 
            name:name?name:user.name,
            phone:phone?phone:user.phone
          } 
        },
        { new: true }
      );
      
    } else {
      console.log("пароль изменился");
      user.name=name?name:user.name;
      user.phone=phone?phone:user.phone;
      user.password=password;
      savedUser = await user.save();
    }
  } else {
    console.log("пароль не пришел");
    savedUser=await  User.findByIdAndUpdate(
      _id,
      {  $set: 
        { 
          name:name?name:user.name,
          phone:phone?phone:user.phone
        } 
      },
      { new: true }
    );
  }
  const data= savedUser.toObject();
  console.log(data);
    const { password:userPassword, ...userWithoutPassword} =data;
    return userWithoutPassword;
}


async function getById(_id ) {
    return User.findById(_id);
}
async function updateById(_id,data) {
      return User.findByIdAndUpdate(_id, {$set:data},{new:true}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
    });
}

async function deleteById(_id) {
      return User.findOneAndRemove({_id}, function(err, result){
        if(err){
            throw err;
        }
        console.log(result); 
    });
}


async function logout({ token }) {
  return true;
}


async function authSocialNetwork(data) {
  return data;
}
module.exports = {
  get,
  loadUser,
  blockUser,
  unblockUser,
  editUser,
  authSocialNetwork,
  authenticate,
  logout,
  register,
  confirm,
  getById,
  updateById,
  deleteById
};
