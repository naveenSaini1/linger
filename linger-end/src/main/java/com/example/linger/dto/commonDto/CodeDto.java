package com.example.linger.dto.commonDto;

import java.sql.Timestamp;

import lombok.Data;
import lombok.ToString;

/**
 * Author: Naveen Saini
 * Date: 15-Mar-2025	
 */


@Data
@ToString
public class CodeDto {
	private String	 	email;
	private String  	code;
	private String		password;

}
