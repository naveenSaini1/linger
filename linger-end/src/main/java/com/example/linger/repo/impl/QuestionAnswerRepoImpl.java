package com.example.linger.repo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.SqlConstants;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.repo.QuestionAnswerRepo;
import com.example.linger.rowmapper.MessageRowMapper;

/**
 * Author: Naveen Saini
 * Date: 06-Apr-2025	
 */
@Repository
public class QuestionAnswerRepoImpl implements QuestionAnswerRepo {
	@Autowired
	private JdbcTemplate    jdbcTemplate;
	
	@Autowired
	private SqlConstants	sqlConstants;

	@Override
	public Integer createQuestion(Integer userid, String title, String body) throws MyCustomeException {
		Object[]		data		=	{userid,title,body};
		
		try {
			return jdbcTemplate.update(sqlConstants.INSERT_INTO_QUESTION,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public Integer createAnswer(Integer questionId, Integer userid, String body) throws MyCustomeException {
		Object[]		data		=	{questionId,userid,body};
		
		try {
			return jdbcTemplate.update(sqlConstants.INSERT_INTO_ANSWER,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

}
