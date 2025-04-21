package com.example.linger.repo;

import com.example.linger.exception.MyCustomeException;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
public interface CodeRepo {
	
	public Integer insertCode(String code,Integer userId) throws MyCustomeException;
	public Integer  verifyAndChangeThePassword(String password,String email,String code) throws MyCustomeException;
	public Integer  verifyTheUser(String email,String code) throws MyCustomeException;
	public Integer  insertSession(String username,String session) throws MyCustomeException;
	public Integer	updateSession(String session) throws MyCustomeException;

}
