import PropTypes from "prop-types";
import Message from "./Message";
import { useEffect, useRef } from "react";

export default function MessageBlock({ chats }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="border-r px-2 py-5 flex flex-col gap-2 overflow-auto lg:w-full border-t-white lg:h-36">
      {chats?.map((chat) => (
        <Message chat={chat} key={chat.id} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

MessageBlock.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userMessage: PropTypes.string,
      botMessage: PropTypes.string,
    })
  ).isRequired,
};
