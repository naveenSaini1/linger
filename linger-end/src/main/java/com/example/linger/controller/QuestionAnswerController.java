package com.example.linger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Question;
import com.example.linger.service.QuestionAnswerService;

/**
 * Author: Naveen Saini
 * Date: 06-Apr-2025	
 */
@RestController
@RequestMapping("/api/questionanswer")
public class QuestionAnswerController {
	
	@Autowired
	private QuestionAnswerService	questionAnswerService;
	
	@PostMapping("/createQuestion")
	public ResponseEntity<ResponseModel<Boolean>>	createQuestion(@RequestBody Question question) throws MyCustomeException{
		
		return new ResponseEntity<ResponseModel<Boolean>>(questionAnswerService.createQuestion(question),HttpStatus.CREATED);
		
	}
	@PostMapping("/createAnswer")
	public ResponseEntity<ResponseModel<Boolean>>	createAnswer(@RequestBody Question question) throws MyCustomeException{
		
		return new ResponseEntity<ResponseModel<Boolean>>(questionAnswerService.createAnswer(question),HttpStatus.CREATED);
		
	}
	

}
