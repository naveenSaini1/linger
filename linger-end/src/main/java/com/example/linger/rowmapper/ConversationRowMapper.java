package com.example.linger.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.conversation.UserDetails;
import com.example.linger.enums.ConversationType;
import com.example.linger.model.Conversation;

/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */
public class ConversationRowMapper {
	
	public static class GetTheConversation implements ResultSetExtractor<Conversation>{

		@Override
		public Conversation extractData(ResultSet rs) throws SQLException, DataAccessException {
			Conversation conversation	=	null;
			while(rs.next()) {
				conversation =	new Conversation();
				conversation.setConversationId(rs.getInt("conversationid"));
				conversation.setSenderId(rs.getInt("senderid"));
				conversation.setReceiverId(rs.getInt("reciverid"));
				conversation.setCreationTime(rs.getTimestamp("creationtime"));
				conversation.setType(ConversationType.valueOf(rs.getString("type")));
				
			}
			return conversation;
		}
		
	}
	public static class GetTheUserDetails implements ResultSetExtractor<UserDetails>{

		@Override
		public UserDetails extractData(ResultSet rs) throws SQLException, DataAccessException {
			UserDetails conversation	=	null;
			while(rs.next()) {
				conversation =	new UserDetails();
				conversation.setConversationId(rs.getInt("conversationid"));
				conversation.setUserId(rs.getInt("userid"));
				conversation.setName(rs.getString("name"));
				conversation.setUsername(rs.getString("username"));
				conversation.setIsActive(rs.getBoolean("isactive"));
				conversation.setProfileImage(rs.getString("profileImage"));
				conversation.setType(ConversationType.valueOf(rs.getString("type")));
				conversation.setSenderId(rs.getInt("senderid"));
				
			}
			return conversation;
		}
		
	}
	public static class FetchChatFriendsList implements ResultSetExtractor<List<Friend>>{

		@Override
		public List<Friend> extractData(ResultSet rs) throws SQLException, DataAccessException {
			List<Friend>	response	=	new ArrayList<>();
			while(rs.next()) {
				Friend friend = new Friend();
				friend.setName(rs.getString("name"));
				friend.setUsername(rs.getString("username"));
				friend.setProfileImage(rs.getString("profileimage"));
				friend.setSenderUsername(rs.getString("senderusername"));
				friend.setType(rs.getString("type"));
				response.add(friend);
				
			}
			return response;
		}
		
	}

}
