package com.example.linger.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

/**
 * Author: Naveen Saini
 * Date: 14-Mar-2025	
 */
public class CodeRowMapper {
	
	public static class FindTTheLatesCode implements ResultSetExtractor<String>{

		@Override
		public String extractData(ResultSet rs) throws SQLException, DataAccessException {
			
			return rs.getString("code");
		}
		
	}

}
