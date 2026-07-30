import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!connectionString) {
  throw new Error("AZURE_STORAGE_CONNECTION_STRING is missing.");
}

if (!containerName) {
  throw new Error("AZURE_STORAGE_CONTAINER_NAME is missing.");
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient(containerName);

export async function uploadToAzure(file) {
  try {
    await containerClient.createIfNotExists();

    const blobName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(file.path);

    return {
      blobName,
      blobUrl: blockBlobClient.url,
    };
  } catch (error) {
    console.error("Azure Upload Error:", error);
    throw error;
  }
}

export async function deleteFromAzure(blobName) {
  try {
    const blobClient = containerClient.getBlockBlobClient(blobName);

    await blobClient.deleteIfExists();

    
  } catch (error) {
    console.error("Azure Delete Error:", error);
    throw error;
  }
}

export async function downloadFromAzure(blobName) {
  try {
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const response = await blobClient.download();

    const chunks = [];

    for await (const chunk of response.readableStreamBody) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  } catch (error) {
    console.error("Azure Download Error:", error);
    throw error;
  }
}
