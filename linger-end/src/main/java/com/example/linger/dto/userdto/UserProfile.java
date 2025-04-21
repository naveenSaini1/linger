package com.example.linger.dto.userdto;

import lombok.Data;

/**
 * Author: Naveen Saini
 * Date: 19-Mar-2025	
 */
@Data
public class UserProfile {
	private 	String 		name;
	private 	String 		username;
	private 	String 		profileimage;
	private 	String 		bio; 			
	private 	int 		followersCount; 
	private 	int 		followingCount; 
	private		Boolean		isFollowing;
	  

}
