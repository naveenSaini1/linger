package com.example.linger.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.dto.userdto.UserFollowoList;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.service.FollowService;

/**
 * Author: Naveen Saini
 * Date: 18-Mar-2025	
 */
@RestController
@RequestMapping("/api/follow")
public class FollowController {
	
	@Autowired
	private FollowService	followService;
	
	@GetMapping("/followTo/{username}")
	public ResponseEntity<ResponseModel<Boolean>> followToTheUser(@PathVariable("username") String username) throws MyCustomeException{
		return new ResponseEntity<ResponseModel<Boolean>>(followService.followToTheUser(username),HttpStatus.ACCEPTED);
		
	}
	@GetMapping("/unfollow/{username}")
	public ResponseEntity<ResponseModel<Boolean>> unfollowToTheUser(@PathVariable("username") String username) throws MyCustomeException{
		return new ResponseEntity<ResponseModel<Boolean>>(followService.unFollowToTheUser(username),HttpStatus.ACCEPTED);
		
	}
	@GetMapping("/getTheFollower/{username}/{page}")
	public ResponseEntity<ResponseModel<List<UserFollowoList>>> getTheFollower(@PathVariable("username") String username,@PathVariable("page") Integer page) throws MyCustomeException{
		System.out.println(username+"    follow   "+page);
		return new ResponseEntity<ResponseModel<List<UserFollowoList>>>(followService.getTheFollowerList(username,page),HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/getTheFollowing/{username}/{page}")
	public ResponseEntity<ResponseModel<List<UserFollowoList>>> getTheFollowing(@PathVariable("username") String username,@PathVariable("page")Integer page) throws MyCustomeException{
		System.out.println(username+"    follow   "+page);
		return new ResponseEntity<ResponseModel<List<UserFollowoList>>>(followService.getTheFollowingList(username,page),HttpStatus.ACCEPTED);
		
	}
	
	
	

	
	
	
	

}
