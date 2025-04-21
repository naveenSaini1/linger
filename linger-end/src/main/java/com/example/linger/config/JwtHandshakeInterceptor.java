package com.example.linger.config;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.example.linger.config.jwttoken.JwtUtils;
import com.example.linger.repo.CodeRepo;
import com.example.linger.repo.FollowRepo;
import com.example.linger.repo.impl.CodeRepoImpl;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Author: Naveen Saini
 * Date: 31-Mar-2025	
 */
@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor , ChannelInterceptor {
	
	  @Autowired
	  private CodeRepo	 codeRepo;  
	  
	  @Autowired
	  private JwtUtils	jwtUtils;
	
	    @Override
	    public Message<?> preSend(Message<?> message, MessageChannel channel) {
	        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
	        System.out.println("preSend  " +accessor.getCommand());
	        if (accessor.getCommand() != null) { // Ignore heartbeats
	            switch (accessor.getCommand()) {
	                case CONNECT:
	                    System.out.println("Intercepted CONNECT");
	                    break;
	                case SUBSCRIBE:

	                    String authToken = accessor.getFirstNativeHeader("Authorization");
	                    
	                    System.out.println("Intercepted SUBSCRIBE: " + accessor.getDestination()+" authToken"+ authToken);
	                    if (authToken == null || !jwtUtils.validateJwtToken(getToken(authToken)) ) {
//	                        throw new IllegalArgumentException("Unauthorized Subscription Attempt!");
	                    	return null;
	                    }

	                    break;
	                case SEND:
	                	  String authToken1 = accessor.getFirstNativeHeader("Authorization");
		                    
		                    System.out.println("Intercepted send: " + accessor.getDestination()+" authToken"+ authToken1);
		                    if (authToken1 == null || !jwtUtils.validateJwtToken(getToken(authToken1)) ) {
//		                        throw new IllegalArgumentException("Unauthorized Subscription Attempt!");
		                    	return null;
		                    }
		                    
	                    break;
	                default:
	                    break;
	            }
	        }

	        return message;
	    }
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
			
				
		   URI 			uri 		= request.getURI();
		   String 		query 		= uri.getQuery();
		   
		   String sessionId = null;
           if (query != null && query.contains("session=")) {
               String[] params = query.split("&");
               for (String param : params) {
                   if (param.startsWith("session=")) {
                       sessionId = param.split("=")[1]; 
                       break;
                   }
               }
           }
           Integer insertedId=codeRepo.updateSession(sessionId);
           System.out.println(sessionId+"  sesssssssssss "+insertedId);

		    if(sessionId!=null && insertedId!=0) {
		    	return true;

  	
		    }
		    
		        response.setStatusCode(HttpStatus.FORBIDDEN); // Reject with 403
		        return false;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		// TODO Auto-generated method stub
		
	}
	
	public String getToken(String token) {
		
	return token.substring(7);
		
	}

}
