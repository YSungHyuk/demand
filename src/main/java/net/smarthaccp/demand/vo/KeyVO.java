package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class KeyVO {
	private String key_type;
	private String key_data;
	private String seq;
	
	public String resultKey() {
		return getKey_type()+getKey_data()+getSeq();
	}
}
