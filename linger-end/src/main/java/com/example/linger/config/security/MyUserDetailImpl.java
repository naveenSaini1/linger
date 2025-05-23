package com.example.linger.config.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.linger.model.User;


public class MyUserDetailImpl implements UserDetails {

	 private static final long serialVersionUID = 1L;
	 
	 public User user;

	  
	  public MyUserDetailImpl(User user) {
		  this.user=user;
	  }


	  @Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			
			Collection<GrantedAuthority> authorities = new ArrayList<>();
			
			SimpleGrantedAuthority sga = new SimpleGrantedAuthority(user.getRole());
			
			authorities.add(sga);
			
			return authorities;
		}
	  

	  @Override
	  public String getPassword() {
	    return user.getPassword();
	  }

	  @Override
	  public String getUsername() {
	    return user.getEmail();
	  }

	  @Override
	  public boolean isAccountNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isAccountNonLocked() {
	    return true;
	  }

	  @Override
	  public boolean isCredentialsNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isEnabled() {
	    return true;
	  }
}
