package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class workOrderVO {
	// 검색 조건
	private String dummy_start_date;
	private String dummy_end_date;
	private String dummy_work_startTime;
	private String dummy_work_endTime;
	private String itemCd;
	private String itemNm;
	private String prodQty;
	private String goodQty;
	private String goodQtyRange;
	private String badQty;
	private String badQtyRange;
	
	// 고유번호
	private String idx;
	
	// 객체
	private SiteVO site;
}
