import React from "react";
import {ChatProvider} from "./ChatContext.jsx";
import ChatWindow from "./ChatWindow.jsx";

const Chat = () => {
    return (
        <ChatProvider>
            <ChatWindow />
        </ChatProvider>
    );
};

export default Chat;