package com.market.marketplace.chat.controller;

import com.market.marketplace.chat.dto.ChatMessageRequest;
import com.market.marketplace.chat.dto.ChatMessageResponse;
import com.market.marketplace.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/private-message")
    public void handlePrivateMessage(ChatMessageRequest request, Principal principal) {
        System.out.println("Principal: " + principal);
        ChatMessageResponse response = chatService.sendMessage(principal.getName(), request);

        messagingTemplate.convertAndSendToUser(
                request.receiverEmail(),
                "/queue/messages",
                response
        );
    }
}
