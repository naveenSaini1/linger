package com.example.linger.dto.userdto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Author: Naveen Saini
 * Date: 22-Apr-2024	
 */
@Data
public class UsersLoginDto {
	@NotNull
	@Size(max=70)
	private		 String		 email;
	@NotNull
	@Size(min=4 ,max=50)
	private		 String		 password;

}
