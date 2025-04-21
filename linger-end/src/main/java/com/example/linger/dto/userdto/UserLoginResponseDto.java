package com.example.linger.dto.userdto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Author: Naveen Saini
 * Date: 26-Apr-2024	
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginResponseDto {
	private 	int 		userId; 		
	private		String 		username; 		
	private		String 		name; 			
	private		String 		email; 			
	private 	String 		bio; 			
	private 	String 		password; 		
	private 	String 		gender; 		
	private 	String 		country; 		
	private 	String 		profileImage;	
	private 	int 		followersCount; 
	private 	int 		followingCount; 
	private 	int 		answersCount; 	
	private     int			questionCount;
	private 	Timestamp 	creationTime;	
	private     Boolean		isverified;
	private		String		token;
	private		String		role;	
	private 	int 		markForDelete; 

}
