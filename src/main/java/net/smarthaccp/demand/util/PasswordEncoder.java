package net.smarthaccp.demand.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	// 파라미터 : 평문(String rawPassword)   리턴타입 : String
	public String getCryptoPassword(String rawPassword) {
		String securePasswd = passwordEncoder.encode(rawPassword);
		return securePasswd;
	}
	
	
	// 파라미터 : 평문(String rawPassword), 암호문(String EncryptedPassword)  리턴타입 : boolean
	public boolean isSameCryptoPassword(String rawPassword, String EncryptedPassword) {
		return passwordEncoder.matches(rawPassword, EncryptedPassword);
	}
	
}












