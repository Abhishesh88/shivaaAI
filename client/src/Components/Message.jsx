import PropTypes from "prop-types";
import UserIcon from "../assets/user.png";
import BotIcon from "../assets/logo.jpg";

export default function Message({ chat }) {
  return (
    <div className="messsage_container">
      {/* User message */}
      {chat.userMessage ? (
        <div className="user message_section flex justify-end">
          <div className="user_message_container py-2.5 rounded flex pl-3 pr-0 bg-[#a1ffbf]">
            <p>{chat.userMessage}</p>
            <p className="triangle w-0 h-0 mt-[2px]" />
          </div>
          <img
            src={UserIcon}
            alt="user icon"
            className="h-[35px] w-[35px] ml-3 rounded-full mt-[3px]"
          />
        </div>
      ) : null}

      {/* Bot response */}
      {chat.botMessage ? (
        <div className="message_section flex">
          <img
            src={BotIcon}
            alt="bot icon"
            className="h-[35px] w-[35px] mr-3 rounded-full mt-[3px]"
          />
          <div className="bot_message_container py-2.5 rounded flex bg-[#a1deff] pr-3 pl-0">
            <p className="triangle w-0 h-0 mt-[2px]" />
            <p>{chat.botMessage}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

Message.propTypes = {
  chat: PropTypes.shape({
    userMessage: PropTypes.string,
    botMessage: PropTypes.string,
  }).isRequired,
};
