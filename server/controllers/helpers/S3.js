import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const uploadImage = async (bucket, key, body) =>
  s3
    .upload({
      Bucket: bucket,
      Key: key,
      Body: body,
    })
    .promise();

const deleteImage = async (bucket, key) =>
  s3
    .deleteObject({
      Bucket: bucket,
      Key: key,
    })
    .promise();

export { deleteImage, uploadImage };
