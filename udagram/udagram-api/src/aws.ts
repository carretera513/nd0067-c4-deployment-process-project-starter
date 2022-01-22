import AWS = require("aws-sdk");
import { config } from "./config/config";

// Configure AWS
// const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
const credentials = new AWS.EnvironmentCredentials('AWS');
credentials.accessKeyId = process.env.ACCESS_KEY_ID;
console.log("ACCESS KEY ID: " + credentials.accessKeyId);
credentials.secretAccessKey = process.env.SECRET_ACCESS_KEY;
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: config.aws_region,
  params: { Bucket: config.aws_media_bucket },
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log("Get Signed URL: " + key);
  return s3.getSignedUrl("getObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;
  console.log("Put Signed URL: " + key);
  return s3.getSignedUrl("putObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
