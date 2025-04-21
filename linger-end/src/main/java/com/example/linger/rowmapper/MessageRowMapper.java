package com.example.linger.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.example.linger.model.Message;

/**
 * Author: Naveen Saini
 * Date: 28-Mar-2025	
 */
public class MessageRowMapper {
	
	
	public static class GetTheMessagesByConversationid implements ResultSetExtractor<List<Message>>{

		@Override
		public List<Message> extractData(ResultSet rs) throws SQLException, DataAccessException {
			List<Message>	response = new ArrayList<>();
			while(rs.next()) {
				Message message= new Message();
				message.setSenderId(rs.getInt("senderid"));
				message.setReceiveId(rs.getInt("reciverid"));
				message.setMessage(rs.getString("message"));
				message.setIsRead(rs.getBoolean("isread"));
				message.setCreationTime(rs.getTimestamp("creationtime"));
				response.add(message);
			}
			return response;
		}
		
	}
	
	public static class GetTheMessagesWhileInserting implements ResultSetExtractor<Message>{

		@Override
		public Message extractData(ResultSet rs) throws SQLException, DataAccessException {
			Message message= null;
			while(rs.next()) {
				message= new Message();
				message.setSenderId(rs.getInt("senderid"));
				message.setReceiveId(rs.getInt("reciverid"));
				
				
			}
			return message;
		}
		
	}

}
