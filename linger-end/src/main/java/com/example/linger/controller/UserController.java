package com.example.linger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.dto.userdto.UserProfile;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.service.MessageService;
import com.example.linger.service.UserService;

/**
 * Author: Naveen Saini
 * Date: 13-Mar-2025	
 */

@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	private UserService service;
	
	@Autowired
	private MessageService	messageService;
	
	
	
	
	
	@GetMapping("/getUserProfile/{username}")
	public ResponseEntity<ResponseModel<UserProfile>> getUserProfile(@PathVariable("username") String username) throws MyCustomeException{
		System.out.println(username+"username");
		return new ResponseEntity<ResponseModel<UserProfile>>(service.getTheUserProfile(username),HttpStatus.ACCEPTED);
		
	

	}
	
	@GetMapping("/getTheUserDetailsForMessage/{username}")
	public ResponseEntity<ResponseModel<com.example.linger.dto.conversation.UserDetails>> getTheUserDetailsForMessage(@PathVariable("username") String username) throws MyCustomeException{
		
	return new ResponseEntity<ResponseModel<com.example.linger.dto.conversation.UserDetails>>(messageService.getTheUserDtailsWhileOnMessageClikc(username),HttpStatus.OK);
	}
	
}
