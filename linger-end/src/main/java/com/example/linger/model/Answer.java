package com.example.linger.model;
/**
 * Author: Naveen Saini
 * Date: 05-Apr-2025	
 */

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Answer {
	private Integer answerId;
	private Integer questionId;
	private Integer userId;
	private String  body;
	private Boolean isaccepted;
	private Integer likeCount;
	private Integer viewCount;
	private Integer commentCount;
	private Timestamp creationtime;
	                
	

}
