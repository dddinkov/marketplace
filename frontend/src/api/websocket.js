import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import {API_URL, authHeaders} from "./api.js";

export let stompClient = null;

export const connectWebSocket = (jwtToken, onMessageReceived) => {
    const socket = new SockJS(`${API_URL}/ws`);

    console.log('JWT token for WebSocket:', jwtToken);


    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
            Authorization: `Bearer ${jwtToken}`
        },
        debug: function (str) {
            console.log(str);
        },
        onConnect: () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe('/user/queue/messages', (message) => {
                onMessageReceived(JSON.parse(message.body));
            });
        }
    });

    stompClient.activate();
}

export const sendMessage = (receiverEmail, content) => {
    if(!stompClient) return;
    stompClient.publish({
        destination: '/app/private-message',
        body: JSON.stringify({receiverEmail, content})
    });
}