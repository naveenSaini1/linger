package com.example.linger.dto.userdto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


/**
 * Author: Naveen Saini
 * Date: 20-Apr-2024	
 */
@Data
public class UsersRegistrationPhaseOne {

	@NotNull
	@Size(min=1, max=50,message = "Name Should Not Null and Max is 50 Character")
	private		 String		 name;
	@NotNull
	@Size(max=70 ,message = "Email Should Not Null and Max is 70 Character")
	private		 String		 email;
	@NotNull
	@Size(max=70 ,message = "please enter the username")
	private		 String		 username;
	@Size(min=6 ,max=50, message = "Password Should Not Null and Min 6 or Max 50 character")
	private		 String		 password;
	
	

}
