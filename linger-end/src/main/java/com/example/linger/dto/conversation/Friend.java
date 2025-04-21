package com.example.linger.dto.conversation;

import lombok.Data;

/**
 * Author: Naveen Saini
 * Date: 29-Mar-2025	
 */
@Data
public class Friend {
	
	private String name;
	private String username;
	private String profileImage;
	private String lastMessage;
	private Integer notReadMessageCount;
	private String senderUsername;
	private String type;

}
