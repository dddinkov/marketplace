import {useContext} from "react";
import {ChatContext} from "./ChatContext.jsx";
import {useChat} from "../hooks/useChat.js";
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList.jsx";


const ChatWindow = () => {
    const jwtToken = localStorage.getItem("token");
    const {messages} = useContext(ChatContext);
    const {send} = useChat(jwtToken);

    const handleSend = (receiver, content) => {
        send(receiver,content);
    }

    return (
        <div className="chat-window">
            <MessageList messages={messages} />
            <MessageInput onSend = {handleSend} />
        </div>
    );
};

export default ChatWindow;