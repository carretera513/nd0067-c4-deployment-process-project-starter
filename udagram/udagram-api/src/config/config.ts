import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  db_username: `${process.env.POSTGRES_USERNAME}`,
  db_password: process.env.POSTGRES_PASSWORD,
  db_database: process.env.POSTGRES_DB,
  db_port: Number(process.env.POSTGRES_PORT),
  db_host: process.env.POSTGRES_HOST,
  port: Number(process.env.PORT),
  dialect: "postgres",
  aws_region: process.env.AWS_REGION,
  aws_profile: process.env.AWS_PROFILE,
  aws_media_bucket: process.env.AWS_BUCKET,
  url: process.env.URL,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
