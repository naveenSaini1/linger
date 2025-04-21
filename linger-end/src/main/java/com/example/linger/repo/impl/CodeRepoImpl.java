package com.example.linger.repo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.SqlConstants;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;
import com.example.linger.repo.CodeRepo;
import com.example.linger.rowmapper.CodeRowMapper;
import com.example.linger.rowmapper.UserRowMapper;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
@Repository
public class CodeRepoImpl  implements CodeRepo{
	
	@Autowired
	private JdbcTemplate jdbcTemplate; 
	@Autowired
	private SqlConstants sqlConstants;

	@Override
	public Integer insertCode(String code, Integer userId) throws MyCustomeException {
		Object[]				data		=		{userId,code};
	
		try {
			return jdbcTemplate.update(sqlConstants.INSERT_CODE,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
	}

	@Override
	public Integer verifyAndChangeThePassword(String password,String email,String code) throws MyCustomeException {
		Object[]				data		=		{password,email,code};
		
		try {
			return jdbcTemplate.update(sqlConstants.VERIFY_AND_CHANGE_THE_PASSWORD,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
	}
	
	@Override
	public Integer verifyTheUser(String email,String code) throws MyCustomeException {
		Object[]				data		=		{email,code};
		
		try {
			return jdbcTemplate.update(sqlConstants.UPDATE_VERIFY_BY_CODE_EMAIL,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
	}

	@Override
	public Integer insertSession(String username, String session) throws MyCustomeException {
	Object[]				data		=		{username,session};
			
			try {
				return jdbcTemplate.update(sqlConstants.INSERT_INTO_SESSION,data);
			}
			catch(Exception ex) {
				data	=	null;
				throw new MyCustomeException(ex.getMessage());
			}
	}

	@Override
	public Integer updateSession(String session) throws MyCustomeException {
		Object[]				data		=		{session};
		
		try {
			return jdbcTemplate.update(sqlConstants.DELETE_SESSION_IF_VERFIYED,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
	}

	
}
