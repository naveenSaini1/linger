package com.example.linger.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.commonDto.CodeDto;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.repo.CodeRepo;
import com.example.linger.service.CodeService;
import com.example.linger.util.CommonUtil;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
@Service
public class CodeServiceImpl implements CodeService{
	
	@Autowired
	private CodeRepo codeRepo;
	
	@Autowired
	private CommonUtil	commonUtil;
	
	@Autowired
	PasswordEncoder encoder;

	@Override
	public ResponseModel<Boolean> verfiyTheCode(CodeDto code) throws MyCustomeException {
		if(code==null || code.getEmail().isEmpty() || code.getPassword().isEmpty()) {
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		}
		
		
		Integer						dbResponse		=	codeRepo.verifyAndChangeThePassword(encoder.encode(code.getPassword()),code.getEmail(), code.getCode());
		ResponseModel<Boolean>		response	=	new ResponseModel<>();
		
		
		if(dbResponse==0) {
			throw new MyCustomeException(ErroMessageConstants.SOMETING_WENT_WRONG);

		}
		response.setResultType(ResponseModelsType.SUCCESS);;
		response.setData(true);;
		return response;
	}

	@Override
	public ResponseModel<Boolean> verifiyTheUserByCode(CodeDto code) throws MyCustomeException {
		if(code==null ||code.getEmail()==null ||code.getEmail().isEmpty()) {
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		}
		
		
		Integer						dbResponse		=	codeRepo.verifyTheUser(code.getEmail(), code.getCode());
		ResponseModel<Boolean>		response	=	new ResponseModel<>();
		
		
		if(dbResponse==0) {
			throw new MyCustomeException(ErroMessageConstants.SOMETING_WENT_WRONG);

		}
		response.setResultType(ResponseModelsType.SUCCESS);;
		response.setData(true);;
		return response;
	}
	

}
