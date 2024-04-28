import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";


const client = new S3Client({
    region: process.env.REACT_APP_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
    },
});

const S3Service = {
    uploadImage: async (file: File | string, fileName?: string) => {
        try {
            let binaryData;
            let actualFileName;

            if (typeof file === 'string') {
                binaryData = base64toBlob(file);
                actualFileName = fileName || `image_${new Date().getTime()}.jpg`;
            } else {
                binaryData = file;
                actualFileName = file.name;
            }

            const params = {
                Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
                Key: actualFileName,
                Body: binaryData,
                ACL: "public-read" as ObjectCannedACL,
            };

            const command = new PutObjectCommand(params);
            await client.send(command);

            const url = `https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3.amazonaws.com/${actualFileName}`;

            return url;
        } catch (error) {
            console.error("Error uploading:", error);
            throw error;
        }
    },
};

function base64toBlob(base64Data: string) {
    const contentType = base64Data.split(";")[0].split(":")[1];
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}

export default S3Service;