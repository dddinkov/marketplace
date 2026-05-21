package com.market.marketplace.chat.repository;

import com.market.marketplace.chat.model.ChatMessage;
import com.market.marketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySender(User sender);

    List<ChatMessage> findByReceiver(User receiver);

    List<ChatMessage> findBySenderAndReceiverOrReceiverAndSenderOrderByTimestampAsc(
            User sender1, User receiver1, User sender2, User receiver2
    );
}
