package com.example.linger.config.alloworigin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Author: Naveen Saini
 * Date: 10-Mar-2025	
 */
@Configuration
public class WebConfig implements WebMvcConfigurer{
	@Value("${allowedOrigins}")
	private		String			allowedOrigins;
	@Value("${file_upload_dir}")
	private			String			file_upload_dir;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(allowedOrigins,"http://192.168.137.175:8081/")
		.allowedMethods("*");

	}
	   @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/static/**").addResourceLocations("file:"+file_upload_dir);
	    }
	
	

}