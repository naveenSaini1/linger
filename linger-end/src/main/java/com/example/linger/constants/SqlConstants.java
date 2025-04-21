package com.example.linger.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * Author: Naveen Saini 

 */

@Component
@PropertySource("classpath:sql.properties")
public class SqlConstants {
	// users query
    @Value("${INSERT_USERS_IN_TO_USER_TABLE}")
	public		 String			 INSERT_USERS_IN_TO_USER_TABLE;
    @Value("${FIND_THE_USER_BY_EMAIL}")
    public		 String			 FIND_THE_USER_BY_EMAIL;
    @Value("${GET_THE_USER_DATA_BY_USERNAME}")
    public		 String			 GET_THE_USER_DATA_BY_USERNAME;
    @Value("${UPDATE_VERIFY_BY_CODE_EMAIL}")
    public		String			UPDATE_VERIFY_BY_CODE_EMAIL;
    @Value("${VERIFY_AND_CHANGE_THE_PASSWORD}")
    public		String			VERIFY_AND_CHANGE_THE_PASSWORD;
    
    
    @Value("${INCREASE_THE_USER_FOLLOWER_COUNT}")
    public		String			INCREASE_THE_USER_FOLLOWER_COUNT;
    
    @Value("${INCREASE_THE_USER_FOLLOWING_COUNT}")
    public		String			INCREASE_THE_USER_FOLLOWING_COUNT;
    
    @Value("${DECREASE_THE_USER_FOLLOWER_COUNT}")
    public		String			DECREASE_THE_USER_FOLLOWER_COUNT;
    
    @Value("${DECREASE_THE_USER_FOLLOWING_COUNT}")
    public		String			DECREASE_THE_USER_FOLLOWING_COUNT;
    
    @Value("${INCREASE_THE_USER_QUESTION_COUNT}")
    public		String			INCREASE_THE_USER_QUESTION_COUNT;
    
    @Value("${DECREASE_THE_USER_QUESTION_COUNT}")
    public		String			DECREASE_THE_USER_QUESTION_COUNT;
    
    @Value("${INCREASE_THE_USER_ANSWER_COUNT}")
    public		String			INCREASE_THE_USER_ANSWER_COUNT;
    
    @Value("${DECREASE_THE_USER_ANSWER_COUNT}")
    public		String			DECREASE_THE_USER_ANSWER_COUNT;
    

    
    
    // code query
    @Value("${INSERT_CODE}")
    public		String			INSERT_CODE;
    
    // follow
    @Value("${MAKE_THE_USER_FOLLOW}")
    public		String			MAKE_THE_USER_FOLLOW;
    @Value("${CHECK_IF_THE_USER_FOLLOWING}")
    public		String			CHECK_IF_THE_USER_FOLLOWING;
    
    
    @Value("${UPDATE_IF_THE_USER_ALREADY_HAVE}")
    public		String			UPDATE_IF_THE_USER_ALREADY_HAVE;
    
    
    
    @Value("${UNFOLLOW_THE_USER}")
    public		String			UNFOLLOW_THE_USER;
    
    @Value("${GET_THE_FOLLOWERS_BY_USERNAME}")
    public		String			GET_THE_FOLLOWERS_BY_USERNAME;
    
    @Value("${GET_THE_FOLLWING_BY_USERNAME}")
    public		String			GET_THE_FOLLWING_BY_USERNAME;
    
    // Message
    @Value("${INSERT_THE_MESSAGE_IF_THE_CONVERSATION_TYPE}")
    public		String			INSERT_THE_MESSAGE_IF_THE_CONVERSATION_TYPE;
    @Value("${GET_THE_MESSAGES_BY_CONVERSATION_ID}")
    public		String			GET_THE_MESSAGES_BY_CONVERSATION_ID;
    
    // conversation 
    @Value("${GET_THE_CONVERSATION_IF_EXIST}")
    public		String			GET_THE_CONVERSATION_IF_EXIST;
    @Value("${INSERT_INTO_CONVERSATION}")
    public		String			INSERT_INTO_CONVERSATION;
    @Value("${TOGGLE_CONVERSATION_THE_TYPE}")
    public		String			TOGGLE_CONVERSATION_THE_TYPE;
    @Value("${GET_THE_USER_DETAILS_WHILE_CLICKING_ON_MESSAGE}")
    public		String			GET_THE_USER_DETAILS_WHILE_CLICKING_ON_MESSAGE;
    @Value("${FETCH_FRIENDS_LIST_OF_MESSAGING}")
    public		String			FETCH_FRIENDS_LIST_OF_MESSAGING;
    
//    session 
    @Value("${INSERT_INTO_SESSION}")
    public		String			INSERT_INTO_SESSION;
    @Value("${DELETE_SESSION_IF_VERFIYED}")
    public		String			DELETE_SESSION_IF_VERFIYED;
    
    
//    question
    @Value("${INSERT_INTO_QUESTION}")
    public		String			INSERT_INTO_QUESTION;
    
//	 answer
    @Value("${INSERT_INTO_ANSWER}")
    public		String			INSERT_INTO_ANSWER;
    
    
    
   
 }

