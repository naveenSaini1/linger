package com.example.linger.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.example.linger.model.User;



/**
 * Author: Naveen Saini 
 * Date: 22-Apr-2024
 */

public class UserRowMapper {

	public static class FindByUserEmailMapper implements ResultSetExtractor<User> {

		@Override
		public User extractData(ResultSet rs) throws SQLException, DataAccessException {
			
			return getTheCompleteUserByResultSet(rs);

		}
		
		
	}
	public static class getTheDataByUsername implements ResultSetExtractor<User>{

		@Override
		public User extractData(ResultSet rs) throws SQLException, DataAccessException {
			
			return getTheCompleteUserByResultSet(rs);
			
		}
		
	}
	
	public static class GetTheUserId implements RowMapper<Integer>{

		@Override
		public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
			
			return rs.getInt("userid");
			
		}
		
	}


	
	public static User getTheCompleteUserByResultSet(ResultSet rs) throws SQLException {
		User 	user		 =	 new User();
		boolean flag		 =   false;
		while (rs.next()) {
			flag=true;
			user.setUserId(rs.getInt("userid"));
			user.setUsername(rs.getString("username"));
			user.setName(rs.getString("name"));
			user.setEmail(rs.getString("email"));
			user.setBio(rs.getString("bio"));
			user.setPassword(rs.getString("password"));
			user.setGender(rs.getString("gender"));
			user.setCountry(rs.getString("country"));
			user.setProfileImage(rs.getString("profileimage"));
			user.setFollowersCount(rs.getInt("followerscount"));
			user.setFollowingCount(rs.getInt("followingcount"));
			user.setAnswersCount(rs.getInt("answerscount"));
			user.setQuestionCount(rs.getInt("questioncount"));
			user.setIsverified(rs.getBoolean("isverified"));
			user.setCreationTime(rs.getTimestamp("creationtime"));
			user.setRole(rs.getString("role"));
		}
		if(!flag)return null;
		
		return user;
	}
}
