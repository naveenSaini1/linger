package com.example.linger.enums;


import lombok.Data;
/**
 * Author: Naveen Saini
 * Date: 20-Apr-2024	
 */
@Data
public class ResponseModel<T> {
	private ResponseModelsType resultType;
	private T data;
}
