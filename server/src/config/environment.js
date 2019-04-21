const dotenv = require("dotenv");
const joi = require("joi");

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "test", "production")
      .default("development"),
    APP_PORT: joi.number().default(3001),
    CLIENT_PORT: joi.number().default(3000),
    JWT_ENCRYPTION: joi
      .string()
      .default("e5a3388c-9731-4043-8b11-be602d8c8919"),
    JWT_EXPIRATION: joi.number().default(28800),
    GITHUB_CLIENT_ID: joi.string().default("66cfd1f1666e3c5fca86"),
    GITHUB_CLIENT_SECRET: joi
      .string()
      .default("85376579f2433c0b8898f4a297b8d5b3eff7ad14"),
    GOOGLE_CLIENT_ID: joi
      .string()
      .default(
        "946233972394-rvpkdri1ppv4il9pia837sh0c7vnpegf.apps.googleusercontent.com"
      ),
    GOOGLE_CLIENT_SECRET: joi.string().default("uB91xl96kpL8fZMAxAH2nwtI"),
    NODEMAILER_AUTH_USER: joi.string().default("artem.s.furman@gmail.com"),
    NODEMAILER_AUTH_PASS: joi.string().default("462450192f"),
    MONGODB_HOST: joi.string().default("mongodb://127.0.0.1:27017/log")
  })
  .unknown()
  .required();

dotenv.config();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  app: {
    environment: envVars.NODE_ENV,
    port: envVars.APP_PORT,
    clientPort: envVars.CLIENT_PORT
  },
  jwt: {
    secret: envVars.JWT_ENCRYPTION,
    expiration: envVars.JWT_EXPIRATION
  },
  github: {
    client_id: envVars.GITHUB_CLIENT_ID,
    secret: envVars.GITHUB_CLIENT_SECRET
  },
  google: {
    client_id: envVars.GOOGLE_CLIENT_ID,
    secret: envVars.GOOGLE_CLIENT_SECRET
  },
  nodemailer: {
    user: envVars.NODEMAILER_AUTH_USER,
    pass: envVars.NODEMAILER_AUTH_PASS
  },
  mongodb: {
    host: envVars.MONGODB_HOST
  }
};
