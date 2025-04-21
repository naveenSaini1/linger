package com.example.linger.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.linger.constants.DefaultConstants;
import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Question;
import com.example.linger.repo.QuestionAnswerRepo;
import com.example.linger.repo.UserRepo;
import com.example.linger.service.QuestionAnswerService;
import com.example.linger.util.CommonUtil;

/**
 * Author: Naveen Saini
 * Date: 06-Apr-2025	
 */
@Service
public class QuestionAnswerServiceImpl implements QuestionAnswerService {
	
	@Autowired
	private QuestionAnswerRepo	questionAnswerRepo;
	
	@Autowired
	private UserRepo			userRepo;
	@Autowired
	private	CommonUtil		commonUtil;

	@Override
	public ResponseModel<Boolean> createQuestion(Question question) throws MyCustomeException {
		if(question==null || question.getBody().isBlank() || question.getTitle().isBlank())
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		
		Integer					responseId		=	0;
		Integer					userId			=	commonUtil.getUserId();
		String					logedUserName	=	commonUtil.getUsername();
		ResponseModel<Boolean> 	response		=	new ResponseModel<>();
		
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(true);
		responseId		=	questionAnswerRepo.createQuestion(userId, question.getTitle(),question.getBody());
		
		if(responseId==0) {
			response.setData(false);
			return response;
			
		}
		
		userRepo.updateTheQuestionCount(logedUserName, DefaultConstants.INCREASE);
		
		
		

		return response;
	}

	@Override
	public ResponseModel<Boolean> createAnswer(Question question) throws MyCustomeException {
		if(question==null || question.getBody().isBlank() ||  question.getQuestionId()==0)
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		
		Integer					responseId		=	0;
		Integer					userId			=	commonUtil.getUserId();
		String					logedUserName	=	commonUtil.getUsername();
		ResponseModel<Boolean> 	response		=	new ResponseModel<>();
		
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(true);
		responseId		=	questionAnswerRepo.createAnswer(question.getQuestionId(),userId, question.getBody());
		
		if(responseId==0) {
			response.setData(false);
			return response;
			
		}
		
		userRepo.updateTheAnswerCount(logedUserName, DefaultConstants.INCREASE);
		return response;
	}

}
