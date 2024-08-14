import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBlock from "./MessageBlock";
import Logo from "../assets/Logo.png";
import getIceServerCred from "../api/getIceServerCred";
import SpeechService from "../utills/SpeachService";
import ErrorModal from "./ErrorModal";
import Webcam from "react-webcam";
import { queries } from "../constants";
import Timer from "./Timer";

const CompNew = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const webcamRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [show, setShow] = useState(true);
  const [service, setService] = useState();
  const [isError, setIsError] = useState(false);
  const [botLoading, setBotLoading] = useState(true);
  const [currentQueNo, setCurrentQueNo] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  const handleReset = () => {
    setSecondsRemaining(30);
  };

  const callGPTApi = async (queNo) => {
    setShowTimer(false);
    if (queNo >= queries.length - 1) {
      const newQue = "Thank You for response we will back to you soon";
      const newMsg = {
        id: uuidv4(),
        botMessage: newQue,
      };
      setChats((prev) => [...prev, newMsg]);
      await service.avatarVideo(newQue);
    } else {
      const newQue = queries[queNo].question;
      const newMsg = {
        id: queries[queNo].id,
        botMessage: newQue,
      };
      setChats((prev) => [...prev, newMsg]);
      getVideo(newQue, queNo);
    }
    handleReset();
  };

  const getVideo = async (text, queNo) => {
    await service.avatarVideo(text);
    startRecord(queNo);
  };

  const startRecord = (queNo) => {
    setShowTimer(true);
    service.startSpeechRecognition((text) => {
      const newMsg = {
        id: uuidv4(),
        userMessage: text,
      };
      setChats((prev) => [...prev, newMsg]);
      setTimeout(() => {
        service.stopSpeechRecognition();
      }, 30000);
      setCurrentQueNo((prev) => prev + 1);
      callGPTApi(queNo + 1);
    });
  };

  const handleStart = async () => {
    setShow(false);
    videoRef.current.play();
    audioRef.current.play();
    const startMsg = queries[currentQueNo].question;
    const newMsg = {
      id: queries[currentQueNo].id,
      botMessage: startMsg,
    };
    setChats([newMsg]);
    await service.avatarVideo(startMsg);
    startRecord(currentQueNo);
    handleReset();
  };

  useEffect(() => {
    const callServerCred = async () => {
      try {
        const data = await getIceServerCred();
        const serve = new SpeechService(data.data);
        const res = await serve.startAvatar();
        if (res) {
          setBotLoading(false);
        } else {
          setIsError(true);
        }
        setService(serve);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    if (!service) callServerCred();
  }, [service]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    // Clean up the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

  return (
    <>
      <div className="flex justify-center mb-2">
        <div className="w-44 bg-white p-2.5 rounded-lg">
          <img src={Logo} alt="mlai_logo" />
        </div>
      </div>
      <div className="rounded-lg h-[90vh] lg:h-fit lg:w-[800px] m-0 lg:mx-auto mx-2 border-white overflow-hidden border">
        <div className="flex flex-col-reverse lg:flex-row  relative border-b-2  border-white">
          <div className="overflow-hidden h-1/2 lg:w-1/2 lg:h-56 border-b-2 border-white lg:border-none relative">
            <Webcam
              height={200}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            {showTimer && <Timer secondsRemaining={secondsRemaining} />}
          </div>
          <div className="overflow-hidden h-1/2 lg:w-1/2 lg:h-full border-b-2 border-white lg:border-none">
            <video ref={videoRef} id="videoPlayer" preload="none" playsInline />
            <audio ref={audioRef} id="audioPlayer"></audio>
          </div>

          {show ? (
            <div className="absolute top-0 right-0 bg-[#00000060] w-full h-full flex justify-center items-center">
              <button
                disabled={botLoading}
                onClick={handleStart}
                className="border-2 px-4 py-2 rounded-lg hover:bg-blue-100 bg-white font-medium disabled:bg-gray-400"
              >
                {botLoading ? "Connecting..." : "Start"}
              </button>
            </div>
          ) : null}

          {isError ? <ErrorModal /> : null}
        </div>

        <div className="overflow-y-scroll h-40">
          <MessageBlock chats={chats} />
        </div>
      </div>
    </>
  );
};

export default CompNew;
