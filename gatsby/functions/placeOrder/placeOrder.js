const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - ${item.price}
          </li>`
        )
        .join('')}
          </ul>
          <p>Your total is <strong>$${total}</strong> due at pickup</p>
          <style>
          ul {
            list-style: none;
          }
          </style>
        </div> `;
}

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  // CHeck if they've filled out the honeypot

  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop Beep bop zzzz bye! Err 65487' }),
    };
  }
  // Validate the data coming inf is correct

  const requiredFields = ['email', 'name', 'order'];
  await wait(5000);
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops you are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?`,
      }),
    };
  }

  // send the email

  // send the success oir error message

  // Test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slice@example.com>',
    to: `${body.name} <${body.email}>, orders@exmaple.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
