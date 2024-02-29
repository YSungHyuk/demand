package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class PageInfoVO {
	private int listCount;
	private int pageListLimit;
	private int maxPage;
	private int startPage;
	private int endPage;
	private int pageNum;
}
