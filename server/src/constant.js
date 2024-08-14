export const APP_PORT = process.env.APP_PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;

export const MONGODB_URI = `mongodb+srv://Keshav:Jurq04Bn7Yl2d6UJ@cluster0.xzfqnfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
export const DB_NAME = "Avatar_test";

// export const ACS_ENDPOINT = process.env.ACS_ENDPOINT;
// export const ACS_SUBSCRIPTION_KEY = process.env.ACS_SUBSCRIPTION_KEY;
// export const ACS_RESOURCE_NAME = process.env.ACS_RESOURCE_NAME;

export const envVariable = Object.freeze({
  AZURE_SPEECH: {
    key: process.env.AS_Key,
    region: process.env.AS_Region,
  },
});
