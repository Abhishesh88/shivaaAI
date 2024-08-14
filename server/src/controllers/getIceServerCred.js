import axios from "axios";
import { envVariable } from "../constants";

export default async function getIceServerCred() {
  const url = `https://${envVariable.AZURE_SPEECH.region}.tts.speech.microsoft.com/cognitiveservices/avatar/relay/token/v1`;

  const headers = {
    "Ocp-Apim-Subscription-Key": envVariable.AZURE_SPEECH.key,
  };

  const { data } = await axios.get(url, { headers });

  return data;
}
