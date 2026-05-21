package com.market.marketplace.chat.interceptor;

import com.market.marketplace.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@AllArgsConstructor
public class JwtChannelInterceptor implements ChannelInterceptor {
    private final JwtService jwtService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = MessageHeaderAccessor
                .getAccessor(message, StompHeaderAccessor.class);

        if(StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if(authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new IllegalArgumentException("Now JWT token");
            }

            String token = authHeader.substring(7);

            String email = jwtService.extractEmail(token);

            accessor.setUser(new UsernamePasswordAuthenticationToken(email,
                    null,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))));
        }

        System.out.println("STOMP command: " + accessor.getCommand());
        System.out.println("Auth header received: " + accessor.getFirstNativeHeader("Authorization"));

        System.out.println("Principal after setting: " + accessor.getUser().getName());

        return message;
    }
}
