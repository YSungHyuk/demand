package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class SearchInfoVO {
	// 검색 조건
	private String startDate;
	private String endDate;
	private Integer pageNum;
	private Integer startRow;
	private Integer listLimit;
	private Integer listCount;
	private String searchType;
	private String searchKeyword;
	
	public void deleteStartRow() {
		this.startRow = null;
	}
	
	public void deleteListLimit() {
		this.listLimit = null;
	}
}
