package com.market.marketplace.chat.dto;

import com.market.marketplace.chat.model.ChatMessage;

import java.time.LocalDateTime;

public record ChatMessageResponse(
        String senderEmail,
        String receiverEmail,
        String content,
        LocalDateTime timestamp
) {
    public static ChatMessageResponse from(ChatMessage chatMessage) {
        ChatMessageResponse response = new ChatMessageResponse(
                chatMessage.getSender().getEmail(),
                chatMessage.getReceiver().getEmail(),
                chatMessage.getContent(),
                chatMessage.getTimestamp()
        );
        return response;
    }
}
