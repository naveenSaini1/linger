package com.example.linger.controller.usercontroller;


import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.linger.config.jwttoken.JwtUtils;
import com.example.linger.config.security.MyUserDetailImpl;
import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.userdto.UserLoginResponseDto;
import com.example.linger.dto.userdto.UsersLoginDto;
import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.service.UserService;
import com.example.linger.util.CommonUtil;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;





/**
 * Author: Naveen Saini 
 */
@RestController
@RequestMapping("/api/public")
public class UserLoginAndRegisterController
	{
	
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	CommonUtil commonUtil;
	
	@Autowired
	private ModelMapper modelMapper;
	

	

	public UserLoginResponseDto getTheLoginWithToken(UsersLoginDto userLoginDto) throws MyCustomeException  {
		System.out.println("========= login  ===============" + userLoginDto);
		UserLoginResponseDto userResponseDto	=	null;
		String 				 jwt 				=	null; 

	try {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		jwt = jwtUtils.generateJwtToken(authentication);

		MyUserDetailImpl userDetails = (MyUserDetailImpl) authentication.getPrincipal();
//		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
//				.collect(Collectors.toList());
		System.out.println("MYUserDetailsImpl"+userDetails.user.toString());
	    
		userResponseDto	=	modelMapper.map(userDetails.user,UserLoginResponseDto.class);
		
	    userResponseDto.setToken(jwt);
		return userResponseDto;
	}
	catch (Exception e) {
		System.out.println(e.getMessage());
		throw new MyCustomeException(ErroMessageConstants.BAD_CREDENTIAL);
	}

	}

	// login
	@PostMapping("/signin")
	public ResponseEntity<ResponseModel<UserLoginResponseDto>> authenticateUser(@Valid @RequestBody UsersLoginDto userLoginDto) throws MyCustomeException 
	{
		System.out.println("========= login  ===============" + userLoginDto);

		ResponseModel<UserLoginResponseDto> response=new ResponseModel<>();
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(getTheLoginWithToken(userLoginDto));
		return ResponseEntity.ok(response);
	}

	// register
	@PostMapping("/signup")
	public  ResponseEntity<ResponseModel<UserLoginResponseDto>> registerUser(@Valid @RequestBody UsersRegistrationPhaseOne userRegistrationPhaseOne)
			throws MyCustomeException, MessagingException {
		
		System.out.println("========= register  ===============");
		
		String password=userRegistrationPhaseOne.getPassword();
		
		userRegistrationPhaseOne.setPassword(encoder.encode(userRegistrationPhaseOne.getPassword()));
		
		userService.insertUserPhaseOne(userRegistrationPhaseOne);
		
		UsersLoginDto userLoginDto = new UsersLoginDto();
		
		userLoginDto.setEmail(userRegistrationPhaseOne.getEmail());
		userLoginDto.setPassword(password);
	
		ResponseModel<UserLoginResponseDto> response=new ResponseModel<>();
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(getTheLoginWithToken(userLoginDto));
		return new ResponseEntity<ResponseModel<UserLoginResponseDto>>(response,HttpStatus.OK);
	}

}
