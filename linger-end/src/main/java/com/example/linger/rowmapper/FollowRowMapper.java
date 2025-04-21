package com.example.linger.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import com.example.linger.dto.userdto.UserFollowoList;

/**
 * Author: Naveen Saini
 * Date: 19-Mar-2025	
 */
public class FollowRowMapper {
	

	public static class CheckIfTheUserFollwing implements ResultSetExtractor<Integer>{
		@Override
		public Integer extractData(ResultSet rs) throws SQLException, DataAccessException {
			while(rs.next()) {
			return rs.getInt("followid");	
			}
			return 0;
			
		}
		
	}
	
	public static class GetTheFollowList implements ResultSetExtractor<List<UserFollowoList>>{

		@Override
		public List<UserFollowoList> extractData(ResultSet rs) throws SQLException, DataAccessException {
			List<UserFollowoList> response	=	new ArrayList<>();
			while(rs.next()) {
				UserFollowoList	userFollowList = new UserFollowoList();
				userFollowList.setName(rs.getString("name"));
				userFollowList.setUsername(rs.getString("username"));
				userFollowList.setProfileimage(rs.getString("profileimage"));
				userFollowList.setIsFollowing(rs.getBoolean("isFollowing"));
				response.add(userFollowList);
			}
			
			return response;
		}
		
	}

}
