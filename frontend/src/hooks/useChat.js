import {useContext, useEffect} from "react";
import {ChatContext} from "../pages/ChatContext.jsx";
import {connectWebSocket, sendMessage, stompClient} from "../api/websocket.js";

export const useChat = (jwtToken) => {
    const {addMessage} = useContext(ChatContext);

    useEffect(() => {
        console.log(stompClient);
        if(!jwtToken) return;
        if(!stompClient || !stompClient.active) {
            connectWebSocket(jwtToken, (message) => {
                addMessage(message);
            });
        }
    }, [jwtToken]);

    const send = (receiverEmail, content) => {
        sendMessage(receiverEmail, content);
    }

    return {send};
}