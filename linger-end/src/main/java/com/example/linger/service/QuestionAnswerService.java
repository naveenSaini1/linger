package com.example.linger.service;
/**
 * Author: Naveen Saini
 * Date: 05-Apr-2025	
 */

import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Question;

public interface QuestionAnswerService {
	
	public ResponseModel<Boolean> createQuestion(Question question) throws MyCustomeException;
	public ResponseModel<Boolean> createAnswer(Question question) throws MyCustomeException;

	

}
