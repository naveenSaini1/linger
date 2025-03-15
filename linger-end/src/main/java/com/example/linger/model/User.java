package com.example.linger.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
/**
 * Created by Naveen Saini on 20Apr-2024.
*/


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
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
	private		String		role;	
	private 	int 		markForDelete; 

	
}
