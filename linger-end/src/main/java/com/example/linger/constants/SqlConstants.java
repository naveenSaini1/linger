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
    
    // code query
    @Value("${INSERT_CODE}")
    public		String			INSERT_CODE;
   
 }

