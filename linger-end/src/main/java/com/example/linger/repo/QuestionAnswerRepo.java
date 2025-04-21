package com.example.linger.repo;

import com.example.linger.exception.MyCustomeException;

/**
 * Author: Naveen Saini
 * Date: 06-Apr-2025	
 */
public interface QuestionAnswerRepo {
	
	
	public Integer createQuestion(Integer userid,String title,String body) throws MyCustomeException;
	public Integer createAnswer(Integer questionId,Integer userid,String body) throws MyCustomeException;

}
