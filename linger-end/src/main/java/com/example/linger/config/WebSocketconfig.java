package com.example.linger.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Author: Naveen Saini
 * Date: 31-Mar-2025	
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketconfig implements WebSocketMessageBrokerConfigurer {
	
	@Value("${allowedOrigins}")
	private		String			allowedOrigins;
	
	@Autowired
	private JwtHandshakeInterceptor jwtHandshakeInterceptor;
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws")
        .setAllowedOrigins(allowedOrigins)
        .addInterceptors(jwtHandshakeInterceptor) 
        .withSockJS();
	}

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(jwtHandshakeInterceptor); // Register Channel Interceptor
    }
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		 registry.enableSimpleBroker("/topic","/active");
	     registry.setApplicationDestinationPrefixes("/app");
	}

}
