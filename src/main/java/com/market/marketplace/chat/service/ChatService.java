package com.market.marketplace.chat.service;

import com.market.marketplace.chat.dto.ChatMessageRequest;
import com.market.marketplace.chat.dto.ChatMessageResponse;
import com.market.marketplace.chat.model.ChatMessage;
import com.market.marketplace.chat.repository.ChatMessageRepository;
import com.market.marketplace.exception.UserNotFoundException;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageResponse sendMessage(String senderEmail, ChatMessageRequest request) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(UserNotFoundException::new);

        User receiver = userRepository.findByEmail(request.receiverEmail())
                .orElseThrow(UserNotFoundException::new);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setSender(sender);
        chatMessage.setReceiver(receiver);
        chatMessage.setContent(request.content());
        chatMessage.setTimestamp(LocalDateTime.now());

        chatMessageRepository.save(chatMessage);

        return ChatMessageResponse.from(chatMessage);
    }
}
