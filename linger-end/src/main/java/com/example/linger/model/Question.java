package com.example.linger.model;
/**
 * Author: Naveen Saini
 * Date: 05-Apr-2025	
 */

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Question {
	private Integer questionId;
	private Integer userId;
	private String title;
	private String body;
	private Integer viewCount;
	private Integer likeCount;
	private Integer commentCount;
	private Integer answerCount;
	private Timestamp creationtime;

}
