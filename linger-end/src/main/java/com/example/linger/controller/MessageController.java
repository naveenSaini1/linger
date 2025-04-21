package com.example.linger.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.userdto.MessageSendDto;
import com.example.linger.enums.ResponseMessageModel;
import com.example.linger.enums.ResponseMessageModelType;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Message;
import com.example.linger.service.MessageService;
import com.example.linger.service.UserService;
import com.example.linger.util.CommonUtil;

/**
 * Author: Naveen Saini
 * Date: 25-Mar-2025	
 */
@RestController
@RequestMapping("/api/message")
public class MessageController {
	
	@Autowired
	private MessageService	messageService;
	
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	private UserService		 userService;
	
	@Autowired
	private  CommonUtil		commonUtil;
	
	@GetMapping("/sendMessage/{username}/{message}")
	public ResponseEntity<ResponseModel<Message>> sendMessage(@PathVariable("username") String username,@PathVariable("message") String message) throws MyCustomeException{
		
		return new ResponseEntity<ResponseModel<Message>>(messageService.inserTheMessage(username.trim(), message.trim(),null),HttpStatus.CREATED);
	}
	@GetMapping("/toggleTheRequest/{username}/{type}")	
	public ResponseEntity<ResponseModel<Boolean>> toggleTheResponse(@PathVariable("username") String username,@PathVariable("type")String type) throws MyCustomeException{
		
		return new ResponseEntity<ResponseModel<Boolean>>(messageService.toggleTheConversationRequest(type, username),HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getTheFriendsList")
	public ResponseEntity<ResponseModel<List<Friend>>> getTheFriendsOfChatScreen() throws MyCustomeException{
		return new ResponseEntity<ResponseModel<List<Friend>>>(messageService.fetchAllTheFriendsOfMessageScreen(),HttpStatus.OK);
	}
	
	@MessageMapping("/messageMe")
	
	public void getTheMessage(@Payload MessageSendDto messageSendDto,@Header("Authorization") String authorizationHeader) throws MyCustomeException {
		// first let find the logged username 
		String username =  userService.findTheUserByEmail(commonUtil.jwtValidationAndGetTheName(authorizationHeader)).getUsername();
		// let's get the details that if message is really inserted 
		ResponseModel<Message> response =messageService.inserTheMessage(messageSendDto.getUsername().trim(), messageSendDto.getMessage().trim(),username);
		ResponseMessageModel<Message> res 	=new	ResponseMessageModel<>();
		
		
			response.getData().setMessage(messageSendDto.getMessage());
			res.setData(response.getData());
			res.setResultType(response.getResultType());
			res.setType(ResponseMessageModelType.MESSAGE);
			System.out.println("before"+"/topic/"+username);

			messagingTemplate.convertAndSend("/topic/"+messageSendDto.getUsername(),res);
			
			System.out.println("after"+"/topic/"+username);

			messagingTemplate.convertAndSend("/topic/"+username,res);

			
		
		
	}

}
