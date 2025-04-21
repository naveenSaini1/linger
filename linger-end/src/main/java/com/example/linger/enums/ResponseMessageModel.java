package com.example.linger.enums;

import lombok.Data;

/**
 * Author: Naveen Saini
 * Date: 04-Apr-2025	
 */
@Data
public class ResponseMessageModel<T> {
	private ResponseModelsType resultType;
	private ResponseMessageModelType type;
	private T data;
	

}
