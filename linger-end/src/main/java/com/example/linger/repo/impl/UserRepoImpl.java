package com.example.linger.repo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.DefaultConstants;
import com.example.linger.constants.SqlConstants;
import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;
import com.example.linger.repo.UserRepo;
import com.example.linger.rowmapper.UserRowMapper;


/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
@Repository
public class UserRepoImpl implements UserRepo {
	
	@Autowired
	private JdbcTemplate jdbcTemplate; 
	@Autowired
	private SqlConstants sqlConstants;

	
	@Override
	public int insertUsersPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException {
		Object[]		data		=		{
											usersRegistrationPhaseOne.getName(),
											usersRegistrationPhaseOne.getUsername(),
											usersRegistrationPhaseOne.getEmail(),
											usersRegistrationPhaseOne.getPassword(),
											DefaultConstants.DEFUALT_ROLE,
											};
		Integer			userId	=		0;	
		try {
			
			userId		=   jdbcTemplate.queryForObject(sqlConstants.INSERT_USERS_IN_TO_USER_TABLE,new UserRowMapper.GetTheUserId(),data);
			
			
			return userId;
		}
		catch(Exception ex) {
			data		=	null;
			userId		=	null;
			throw new MyCustomeException(ex.getMessage());
		}
		
		
	}

	@Override
	public User findTheUserByEmail(String email) throws MyCustomeException {
		Object[]				data		=		{email};
		User					user		=		null;
		try {
			user= jdbcTemplate.query(sqlConstants.FIND_THE_USER_BY_EMAIL,new UserRowMapper.FindByUserEmailMapper(),data);
			return user;
		}
		catch(Exception ex) {
			data	=	null;
			user	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
		
		
	}

	@Override
	public User getTheUserDataByUsername(String username) throws MyCustomeException {
		Object[]				data		=		{username};
		User					user		=		null;
		try {
			user= jdbcTemplate.query(sqlConstants.GET_THE_USER_DATA_BY_USERNAME,new UserRowMapper.getTheDataByUsername(),data);
			return user;
		}
		catch(Exception ex) {
			data	=	null;
			user	=	null;
			throw new MyCustomeException(ex.getMessage());
		}
	}


}
