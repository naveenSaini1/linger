package com.example.linger.util;

import java.text.Normalizer;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.example.linger.model.User;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

/**
 * Author: Naveen Saini
 * Date: 12-Mar-2025	
 */
@Component
public class CommonUtil {
	
	@Autowired
    private  JavaMailSender mailSender;
	
	private String PASSWORD_SUBJECT	=	"Your Password Reset Code - Action Required";
	private	String PASSWORD_BODY		=	"<!DOCTYPE html>\n" +
		    "<html>\n" +
		    "<head>\n" +
		    "    <meta charset=\"UTF-8\">\n" +
		    "    <title>Linger Notification</title>\n" +
		    "</head>\n" +
		    "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;\">\n" +
		    "    <table width=\"100%%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" + // Escaped %
		    "        <tr>\n" +
		    "            <td align=\"center\">\n" +
		    "                <table width=\"600px\" style=\"background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n" +
		    "                    <tr>\n" +
		    "                        <td align=\"center\" style=\"padding-bottom: 10px;\">\n" +
		    "                            <h2 style=\"color: #333;\">Hello, %s</h2>\n" + // %s for dynamic username
		    "                        </td>\n" +
		    "                    </tr>\n" +
		    "                    <tr>\n" +
		    "                        <td style=\"font-size: 16px; color: #555; padding-bottom: 20px;\">\n" +
		    "                            We wanted to reach out with an important update. Please find the details below.\n" +
		    "                        </td>\n" +
		    "                    </tr>\n" +
		    "                    <tr>\n" +
		    "                        <td align=\"center\" style=\"padding-bottom: 20px;\">\n" +
		    "                            <span style=\"font-size: 18px; font-weight: bold; color: #007BFF; background-color: #f1f1f1; padding: 10px 20px; border-radius: 5px;\">\n" +
		    "                                %s\n" + // %s for dynamic content
		    "                            </span>\n" +
		    "                        </td>\n" +
		    "                    </tr>\n" +
		    "                    <tr>\n" +
		    "                        <td style=\"font-size: 16px; color: #555; padding-bottom: 20px;\">\n" +
		    "                            If you have any questions, feel free to reach out.\n" +
		    "                        </td>\n" +
		    "                    </tr>\n" +
		    "                    <tr>\n" +
		    "                        <td style=\"font-size: 14px; color: #999; padding-top: 20px; text-align: center;\">\n" +
		    "                            Best regards, <br>\n" +
		    "                            <strong>Linger Team</strong> <br>\n" +
		    "                            <a href=\"https://linger.com\" style=\"color: #007BFF;\">linger.com</a>\n" +
		    "                        </td>\n" +
		    "                    </tr>\n" +
		    "                </table>\n" +
		    "            </td>\n" +
		    "        </tr>\n" +
		    "    </table>\n" +
		    "</body>\n" +
		    "</html>";
	
	private String REGISTRATION_SUBJECT = "Welcome to Linger - Verify Your Account";

	private String REGISTRATION_BODY = "<!DOCTYPE html>\n" +
	    "<html>\n" +
	    "<head>\n" +
	    "    <meta charset=\"UTF-8\">\n" +
	    "    <title>Linger Registration</title>\n" +
	    "</head>\n" +
	    "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;\">\n" +
	    "    <table width=\"100%%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" + 
	    "        <tr>\n" +
	    "            <td align=\"center\">\n" +
	    "                <table width=\"600px\" style=\"background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n" +
	    "                    <tr>\n" +
	    "                        <td align=\"center\" style=\"padding-bottom: 10px;\">\n" +
	    "                            <h2 style=\"color: #333;\">Welcome, %s!</h2>\n" + 
	    "                        </td>\n" +
	    "                    </tr>\n" +
	    "                    <tr>\n" +
	    "                        <td style=\"font-size: 16px; color: #555; padding-bottom: 20px;\">\n" +
	    "                            Thank you for registering at Linger. To complete your registration, please verify your account using the code below:\n" +
	    "                        </td>\n" +
	    "                    </tr>\n" +
	    "                    <tr>\n" +
	    "                        <td align=\"center\" style=\"padding-bottom: 20px;\">\n" +
	    "                            <span style=\"font-size: 18px; font-weight: bold; color: #007BFF; background-color: #f1f1f1; padding: 10px 20px; border-radius: 5px;\">\n" +
	    "                                %s\n" + 
	    "                            </span>\n" +
	    "                        </td>\n" +
	    "                    </tr>\n" +
	    "                    <tr>\n" +
	    "                        <td style=\"font-size: 16px; color: #555; padding-bottom: 20px;\">\n" +
	    "                            Enter this code in the app to activate your account.\n" +
	    "                        </td>\n" +
	    "                    </tr>\n" +
	    "                    <tr>\n" +
	    "                        <td style=\"font-size: 14px; color: #999; padding-top: 20px; text-align: center;\">\n" +
	    "                            Best regards, <br>\n" +
	    "                            <strong>Linger Team</strong> <br>\n" +
	    "                            <a href=\"https://linger.com\" style=\"color: #007BFF;\">linger.com</a>\n" +
	    "                        </td>\n" +
	    "                    </tr>\n" +
	    "                </table>\n" +
	    "            </td>\n" +
	    "        </tr>\n" +
	    "    </table>\n" +
	    "</body>\n" +
	    "</html>";

	public Boolean isValidUsername(String username) {
	    // Length check (3-20 characters)
	    if (username.length() < 3 || username.length() > 20) {
	        return false;
	    }

	    // Allowed characters: a-z, A-Z, 0-9, _
	    if (!username.matches("^[a-zA-Z0-9_]+$")) {
	        return false;
	    }

	    // No consecutive underscores or leading/trailing underscores
	    if (username.startsWith("_") || username.endsWith("_") || username.contains("__")) {
	        return false;
	    }

	    // Reserved words check
	    Set<String> reservedWords = Set.of("admin", "root", "system", "support", "test", "null");
	    if (reservedWords.contains(username.toLowerCase())) {
	        return false;
	    }

	    // No emails or phone numbers
	    if (username.contains("@") || username.matches("^\\d{10,15}$")) {
	        return false;
	    }

	    return true;
	}
	
	public String generateUsername(String email) {
	    // Use name if available, otherwise fallback to email prefix
	    String baseUsername =email.split("@")[0];

	    // Normalize username: Remove dots, special characters, and non-ASCII
	    baseUsername = Normalizer.normalize(baseUsername, Normalizer.Form.NFD)
	        .replaceAll("[^a-zA-Z0-9]", "_");

	    // Ensure minimum length
	    if (baseUsername.length() < 3) {
	        baseUsername = "user_" + UUID.randomUUID().toString().substring(0, 6);
	    }

	    return baseUsername;
	}
	
	public Boolean sendMailCodeForPassword(String to,String username,String code) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        String body			=	String.format(PASSWORD_BODY, username,code);
        
        helper.setTo(to);
        helper.setSubject(PASSWORD_SUBJECT);
        helper.setText(body, true); // 'true' enables HTML      
    
        mailSender.send(message);
		
		return true;
	}
	
	public Boolean sendMailCodeForVerify(String to,String username,String code) throws MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        
        String body			=	String.format(REGISTRATION_BODY, username,code);
        
        helper.setTo(to);
        helper.setSubject(REGISTRATION_SUBJECT);
        helper.setText(body, true); // 'true' enables HTML

        
    
        mailSender.send(message);
		
		return true;
	}
	

        public String generateCode() {
            Random random = new Random();
            int code = 100000 + random.nextInt(900000); // 6-digit code
            return String.valueOf(code);
        }
        
        
        public Integer getUserId() {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        
	        if (authentication != null && authentication.isAuthenticated()) {
	            Object principal = authentication.getPrincipal();

	            if (principal instanceof User) {
	                return ((User) principal).getUserId();
	            } 
	        }
	        
	        return 0;
	    }


}
