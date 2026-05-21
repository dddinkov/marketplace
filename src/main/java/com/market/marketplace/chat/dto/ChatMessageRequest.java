package com.market.marketplace.chat.dto;

public record ChatMessageRequest(
        String receiverEmail,
        String content
) {}
