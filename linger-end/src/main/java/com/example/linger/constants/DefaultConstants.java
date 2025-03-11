package com.example.linger.constants;
import java.util.HashSet;
import java.util.Set;

/**
 * Author: Naveen Saini
 * Date: 22-Apr-2024	
 */
public class DefaultConstants {
	public static Integer 				DEFUALT_RATING						=	0;
	public static String 				DEFUALT_ROLE						=	"ROLE_USER";
	public static Integer 				DEFUALT_COMPLETE_PROFILE			=	10;
	public static Integer				UPGRADE_COMPLETE_PROFILE			=   70;
	public static Integer				DEFAULT_LIMIT_FOR_USER_SEARCH		=	2;
	public static Integer				DEFAULT_LIMIT_FOR_USER_FRIENDS		=	10;	
	public static Integer				DEFAULT_LIMIT_FOR_FRIEND_MESSAGE	= 	10;
	public static Integer				DEFAULT_LIMIT_FOR_FRIENDS_SEARCH	=	10;
	public static Integer				DEFAULT_LIMIT_FOR_QUESTION_FETCH	=	5;
	public static Integer				DEFAULT_LIMIT_FOR_ANSWER_LENGTH		=	300;
    public static Set<String>			REVIEWS_TYPES 						=   new HashSet();
	public static String				REVIEW_COURSE						=	"COURSE";
	
	
	
	
	
	
	
	
	

	
	public static  String checkIfTheTypePresent(String type) {
		REVIEWS_TYPES.add(REVIEW_COURSE);

		String		response	=	null;
		if(REVIEWS_TYPES.contains(type))
			return type;
		
		return response;
		
	}


}
