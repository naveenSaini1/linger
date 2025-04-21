package com.example.linger.model;
/**
 * Author: Naveen Saini
 * Date: 25-Mar-2025	
 */

import java.sql.Timestamp;

import com.example.linger.enums.ConversationType;

import lombok.Data;
import lombok.ToString;
@Data
@ToString
public class Conversation {
	private Integer conversationId;
	private Integer	senderId;
	private	Integer	receiverId;
	private ConversationType type; 
	private Timestamp creationTime;
	private Integer markfordelete;
		
}
