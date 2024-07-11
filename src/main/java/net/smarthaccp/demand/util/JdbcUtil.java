package net.smarthaccp.demand.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import net.smarthaccp.demand.vo.SiteVO;

public class JdbcUtil {
	public static Connection getConnection(SiteVO site) {
		Connection con = null; // DB 연결 객체를 관리하는 Connection 타입 변수 선언
		
		String dbType = site.getDb_type();
		if(dbType.equals("MARIA")) {
			dbType = "jdbc:mariadb://";
		}
		String host = site.getSite_url()+":"+site.getDb_port()+"/"+site.getDb_name();
		String url;
		String username = site.getDb_id();
		String password = site.getDb_pw();
		
		url = dbType+host;
		
		try {
			con = DriverManager.getConnection(url, username, password);
			con.setAutoCommit(false); // 자동 커밋 기능 해제
		} catch (SQLException e) {
			System.out.println("DB 연결 실패!");
			e.printStackTrace();
		}
		return con;
	}
	
	public static void close(Connection con) {
		try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void close(PreparedStatement pstmt) {
		try {
			pstmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void close(ResultSet rs) {
		try {
			rs.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void commit(Connection con) {
		try {
			con.commit();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public static void rollback(Connection con) {
		try {
			con.rollback();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	
}


























