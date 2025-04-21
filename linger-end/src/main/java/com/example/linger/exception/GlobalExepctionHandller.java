package com.example.linger.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;


/**
 * Author: Naveen Saini Date: 22-Apr-2024
 */
@ControllerAdvice
public class GlobalExepctionHandller {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseModel<String>> handleValidationException(MethodArgumentNotValidException e) {
		System.out.println("inside exception method of mehtodargument" + e.getMessage());
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
		response.setResultType(ResponseModelsType.FAIL);
		System.out.println("Inside the Method arugmentnot valid excetion handler and the issue is: "+e.getMessage());

		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
	}

	@ExceptionHandler(MyCustomeException.class)
	public ResponseEntity<ResponseModel<String>> handleValidationOnUserException(MyCustomeException e) {
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(e.getMessage());
		response.setResultType(ResponseModelsType.FAIL);
		System.out.println("Inside the my custome excpetion handler and the issue is: "+e.getMessage());

		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);

	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ResponseModel<String>> handleException(Exception e) {
		System.out.println("inside exception method of excetpion");
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(ErroMessageConstants.SOMETING_WENT_WRONG);
		System.out.println("Inside the main excpetion handler and the issue is: "+e.getMessage());
		response.setResultType(ResponseModelsType.FAIL);
		e.printStackTrace();
		
		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
	}
	@ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ResponseModel<String>> handleNoResourceFoundException(NoResourceFoundException ex) {
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(ex.getMessage());
		response.setResultType(ResponseModelsType.FAIL);
		System.out.println("Inside the NoResourceFound excpetion handler and the issue is: "+ex.getMessage());

		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
    }
	
	   @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<ResponseModel<String>> handleBadSqlException(BadSqlGrammarException ex) {
		ResponseModel<String> response = new ResponseModel<>();
		response.setData(ErroMessageConstants.BAD_SQL_EXCEPTION);
		response.setResultType(ResponseModelsType.FAIL);
		System.out.println("Inside the BadSqlGrammer excpetion handler and the issue is: "+ex.getMessage());
		return new ResponseEntity<ResponseModel<String>>(response, HttpStatus.BAD_GATEWAY);
    }

}
