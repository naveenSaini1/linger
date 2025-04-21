package com.example.linger.service;
/**
 * Author: Naveen Saini
 * Date: 18-Mar-2025	
 */

import java.util.List;

import com.example.linger.dto.userdto.UserFollowoList;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;

public interface FollowService {
	
	public ResponseModel<Boolean>	followToTheUser(String username) throws MyCustomeException;
	public ResponseModel<Boolean>	unFollowToTheUser(String unFollowUsnerName) throws MyCustomeException;
	public ResponseModel<List<UserFollowoList>> getTheFollowerList(String username,Integer page) throws MyCustomeException;
	public ResponseModel<List<UserFollowoList>> getTheFollowingList(String username,Integer page) throws MyCustomeException;

}
