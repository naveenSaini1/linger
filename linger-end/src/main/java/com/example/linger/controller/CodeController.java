    package com.example.linger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.service.CodeService;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
    
@RestController
@RequestMapping("/api/code")
public class CodeController {
	@Autowired
	private CodeService 	codeService;
	
	int x=20;

	
	@GetMapping("/establishConnection")
	public ResponseEntity<ResponseModel<String>> establishTheWebSocketConnection() throws MyCustomeException{
		x+=20;
		System.out.println(x);
		return new ResponseEntity<ResponseModel<String>>(codeService.establishTheWebScoketConnection(),HttpStatus.OK);
	}
}
