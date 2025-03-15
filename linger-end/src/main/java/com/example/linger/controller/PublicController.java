package com.example.linger.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.dto.commonDto.CodeDto;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.service.CodeService;
import com.example.linger.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {
	

	@Autowired
	UserService userService;
	
	@Autowired
	CodeService	codeService;

	
	
	@GetMapping("/checkTheUsername/{username}")
	public ResponseEntity<ResponseModel<Boolean>> checkTheUsernameExist(@PathVariable("username") String username) throws MyCustomeException{
		return new ResponseEntity<ResponseModel<Boolean>>(userService.checkIfTheUsernameExist(username),HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/sendCode/{email}")
	public ResponseEntity<ResponseModel<Boolean>> sendCodeToEmail(@PathVariable("email") String email) throws MyCustomeException, MessagingException{
		System.out.println(email+ "send mail code");
		return new ResponseEntity<ResponseModel<Boolean>>(userService.genrateThecode(email),HttpStatus.ACCEPTED);
		
	}
	
	@PostMapping("/verifiyCode")
	public ResponseEntity<ResponseModel<Boolean>> verfiyThecode(@RequestBody CodeDto code) throws MyCustomeException{
		System.out.println(code);
		return new ResponseEntity<ResponseModel<Boolean>>(codeService.verfiyTheCode(code),HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/verifiyUserCode")
	public ResponseEntity<ResponseModel<Boolean>> verifiyUserCode(@RequestBody CodeDto code) throws MyCustomeException{
		System.out.println("verifiyUserCode "+ code);
		return new ResponseEntity<ResponseModel<Boolean>>(codeService.verifiyTheUserByCode(code),HttpStatus.ACCEPTED);
	}

}
