const nodemailer = require("nodemailer");
const config = require("../config/environment");

module.exports.registerMailForUser = async (name,email,code) => {
  const output = `
    <p>You have a new register request from <em>CLEAN TEAM</em></p>
    <h3>Details</h3>
    <ul>
      <li>Your name on the site is <b>${name}</b></li>
      <li> Your email is ${email}</li>
    </ul>
    <p>Your confirm code is ${code} .You have 5 attemts.<br>Pass this this code and enjoy our services.</p>
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
    subject: "Registration request", // Subject line
    text: "Please, confirm your new account", // plain text body
    html: output // html body
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

module.exports.mailForBlockUser = async (name,email,reason) => {
  const output = `
    <p>Your account was blocked by <em>CLEAN TEAM</em></p>
    <h3>Details</h3>
    <ul>
      <li>Your name on the site is <b>${name}</b></li>
      <li> Blocking reason: ${reason}</li>
    </ul>
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
    subject: "Blocking", // Subject line
    text: "You was blocked", // plain text body
    html: output // html body
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

module.exports.mailForUnBlockUser = async (name,email) => {
  const output = `
    <p>Your account was unblocked!</em></p>
    <h3>Details</h3>
    <ul>
      <li>Your name on the site is <b>${name}</b></li>
      <li> Your email is ${email}</li>
    </ul>
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
    subject: "Unblocking", // Subject line
    text: "You was unblocked!", // plain text body
    html: output // html body
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

module.exports.registerMailForExecutor = async (token,name,email) => {
    const link = `<a href="http://localhost:${config.app.clientPort}/confirm?verifyToken=${token}">finish registration</a>`;

    const output = `
      <p>You have a new register request from <em>CLEAN TEAM</em></p>
      <h3>Details</h3>
      <ul>
        <li>Your name on the site is <b>${name}</b></li>
        <li> Your email is ${email}</li>
      </ul>
      <p>Your secret link.Folow: ${link}</p>
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
      subject: "Registration request", // Subject line
      text: "Please, confirm your new account", // plain text body
      html: output // html body
    };
  
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  };

  module.exports.mailForBlockExecutor = async (name,email,reason) => {
    const output = `
      <p>Your account was blocked by <em>CLEAN TEAM</em></p>
      <h3>Details</h3>
      <ul>
        <li>Your name on the site is <b>${name}</b></li>
        <li> Blocking reason: ${reason}</li>
      </ul>
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
      subject: "Blocking", // Subject line
      text: "You was blocked", // plain text body
      html: output // html body
    };
  
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  };
  module.exports.mailForUnBlockExecutor = async (name,email) => {
    const output = `
      <p>Your account was unblocked!</em></p>
      <h3>Details</h3>
      <ul>
        <li>Your name on the site is <b>${name}</b></li>
        <li> Your email is ${email}</li>
      </ul>
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
      subject: "Unblocking", // Subject line
      text: "You was unblocked!", // plain text body
      html: output // html body
    };
  
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  };
  module.exports.mailAboutNewOrderForExecutor = async (order,email) => {
    const date =new Date();
    const orderDate=date.getFullYear(order.date)+"-"+date.getMonth(order.date)+"-"+date.getDate(order.date);
    const output = `
      <p>You received a new order!</em></p>
      <h3>Order details</h3>
      <ul>
        <li>City <em>${order.city}</em></li>
        <li>Customer email <em>${order.email}</em></li>
        <li>Clianing type <em>${order.type}</em></li>
        <li>Date <em>${orderDate}</em></li>
        <li>See more in your account...</li>
      </ul>
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
      subject: "New order", // Subject line
      text: "You received a new order!", // plain text body
      html: output // html body
    };
  
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  };

  module.exports.mailAboutNewOrderForUser = async (order,email) => {
    const date =new Date();
    const orderDate=date.getFullYear(order.date)+"-"+date.getMonth(order.date)+"-"+date.getDate(order.date);
    const output = `
      <p>You created new order on <em>CLEANING TEAM</em> website</p>
      <h3>Order details</h3>
      <ul>
        <li>City <em>${order.city}</em></li>
        <li>Customer email <em>${order.email}</em></li>
        <li>Clianing type <em>${order.type}</em></li>
        <li>Date <em>${orderDate}</em></li>
        <li>See more in your account...</li>
      </ul>
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
      subject: "New order", // Subject line
      text: "You received a new order!", // plain text body
      html: output // html body
    };
  
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  };