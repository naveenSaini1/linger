package com.example.linger.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;
import com.example.linger.service.UserService;





@Service
public class MyUserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserService userService;

	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("load by user name"+ email);
		User user = new User();
	    user.setEmail(email);
	    User st;
		try {
			st = userService.findTheUserByEmail(email);
			System.out.println("load by inside user name"+ st.getUsername());

			if(st!=null)
			{
				return new MyUserDetailImpl(st);
			}
			throw new BadCredentialsException(email+" not exists. ");

			
		} catch (MyCustomeException e) {
			throw new BadCredentialsException(" not exists. "+e.getMessage());

		}
	}
  
  

}

//public class MyUserDetailsServiceImpl {
//
//}
