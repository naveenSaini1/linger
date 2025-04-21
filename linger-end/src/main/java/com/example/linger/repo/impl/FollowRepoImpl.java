package com.example.linger.repo.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.SqlConstants;
import com.example.linger.dto.userdto.UserFollowoList;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.repo.FollowRepo;
import com.example.linger.rowmapper.FollowRowMapper;

/**
 * Author: Naveen Saini
 * Date: 18-Mar-2025	
 */
@Repository
public class FollowRepoImpl implements FollowRepo {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private SqlConstants	sqlConstants;
	
	@Override
	public Integer followToThroughUsername(Integer follower_id, String followingUsername) throws MyCustomeException {
		Object[]				data		=		{follower_id,followingUsername};
		
		try {
			return jdbcTemplate.update(sqlConstants.MAKE_THE_USER_FOLLOW,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public Integer checkIfTheUserFollowing(String logedUsername, String username) throws MyCustomeException {
		Object[]				data		=		{logedUsername,username};
		
		try {
			return jdbcTemplate.query(sqlConstants.CHECK_IF_THE_USER_FOLLOWING,new FollowRowMapper.CheckIfTheUserFollwing() ,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}
	
	@Override
	public Integer UpdateIfFollowAlreadyExist(String logedUsername, String username) throws MyCustomeException {
		Object[]				data		=		{logedUsername,username};
		
		try {
			return jdbcTemplate.update(sqlConstants.UPDATE_IF_THE_USER_ALREADY_HAVE ,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public Integer unfollowToTheOtherUser(String logedUsername, String unfollowingUserName) throws MyCustomeException {
		Object[]				data		=		{logedUsername,unfollowingUserName};
		
		try {
			return jdbcTemplate.update(sqlConstants.UNFOLLOW_THE_USER,data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public List<UserFollowoList> getTheFollowers(String logedUsernaem,String username,Integer limit,Integer offset) throws MyCustomeException {
		Object[]				data		=		{logedUsernaem,username,limit,offset};
		
		try {
			return jdbcTemplate.query(sqlConstants.GET_THE_FOLLOWERS_BY_USERNAME,new FollowRowMapper.GetTheFollowList(),data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public List<UserFollowoList> getTheFollowoing(String logedUsername,String username,Integer limit,Integer offset) throws MyCustomeException {
		Object[]				data		=		{logedUsername,username,limit,offset};
		
		try {
			return jdbcTemplate.query(sqlConstants.GET_THE_FOLLWING_BY_USERNAME,new FollowRowMapper.GetTheFollowList(),data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}
	

}
