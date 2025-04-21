package com.example.linger.service;
/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */

import com.example.linger.dto.commonDto.CodeDto;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;

public interface CodeService {

	public ResponseModel<Boolean> verfiyTheCode(CodeDto codeDto) throws MyCustomeException;
	public ResponseModel<Boolean> verifiyTheUserByCode(CodeDto codeDto) throws MyCustomeException;
	public ResponseModel<String>  establishTheWebScoketConnection() throws MyCustomeException;

}
