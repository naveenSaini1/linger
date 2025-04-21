package com.example.linger.dto.conversation;
/**
 * Author: Naveen Saini
 * Date: 28-Mar-2025	
 */

import java.util.List;

import com.example.linger.enums.ConversationType;
import com.example.linger.model.Message;

import lombok.Data;
import lombok.ToString;
@Data
@ToString
public class UserDetails {
	private Integer userId;
	private Integer conversationId;
	private String  username;
	private String  name;
	private String	profileImage;
	private Boolean isActive;
	private Integer senderId;
	private ConversationType type;
	private List<Message> messages;

}
