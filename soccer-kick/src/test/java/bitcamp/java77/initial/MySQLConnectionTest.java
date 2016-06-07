package bitcamp.java77.initial;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

public class MySQLConnectionTest {
	private static final String driver = 
			"com.mysql.jdbc.Driver";
	private static final String url = 
			"jdbc:mysql://127.0.0.1:3306/studydb";
	private static final String user = 
			"study";
	private static final String password = 
			"study";
	
	@Test
	public void testConnection() throws Exception {
		Class.forName(driver);
		
		try (
			Connection con = 
			DriverManager.getConnection(url, user, password)
		) {
			System.out.println(con);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
