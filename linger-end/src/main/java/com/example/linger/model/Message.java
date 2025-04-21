package com.example.linger.model;

import java.sql.Timestamp;

import lombok.Data;

/**
 * Author: Naveen Saini
 * Date: 25-Mar-2025	
 */
@Data
public class Message {
	private Integer 	messageId;
	private Integer 	conversationId;
	private Integer 	senderId;
	private Integer 	receiveId;
	private String 		message;
	private Boolean 	isRead;
	private Timestamp 	lastUpdate;
	private Timestamp 	creationTime;
	private	Integer		markForDeleteSender;
	private Integer		markForDeleteReceiver;

}
