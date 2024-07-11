package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class extQryVO {
	// 검색 조건
	private String searchKeyword;
	
	// 고유번호
	private String idx;
	
	// 객체
	private SiteVO site;
}
