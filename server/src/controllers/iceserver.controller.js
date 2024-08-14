import { envVariable } from "../constant.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const iceServerController = asyncHandler(async (req, res) => {
  const url = `https://${envVariable.AZURE_SPEECH.region}.tts.speech.microsoft.com/cognitiveservices/avatar/relay/token/v1`;

  const headers = {
    "Ocp-Apim-Subscription-Key": envVariable.AZURE_SPEECH.key,
  };

  const { data } = await axios.get(url, { headers });

  return res.status(200).json(new ApiResponse(200, data, ""));
});

export { iceServerController };

// import { ACS_ENDPOINT, ACS_SUBSCRIPTION_KEY } from "../constant.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { CommunicationRelayClient } from "@azure/communication-network-traversal";
// import { CommunicationIdentityClient } from "@azure/communication-identity";

// const connectionString = `endpoint=${ACS_ENDPOINT};accessKey=${ACS_SUBSCRIPTION_KEY}`;
// const relayClient = new CommunicationRelayClient(connectionString);
// const identityClient = new CommunicationIdentityClient(connectionString);

// const iceServerController = asyncHandler(async (req, res) => {
//   const user = await identityClient.createUser();
//   const config = await relayClient.getRelayConfiguration(user);
//   return res
//     .status(200)
//     .json(new ApiResponse(200, config.iceServers[0], ""));
// });

// export { iceServerController };
