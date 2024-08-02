const {S3Client, GetObjectCommand} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require('dotenv')

dotenv.config()

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: 'shilpee-bucket',
        Key: key
    });
    const url = getSignedUrl(s3Client, command, {expiresIn: 20})
    return url
}

async function init(){
    console.log("URL for image from shilpee-bucket", await getObjectURL("Study Abroad landing  3.png"));
}

init();