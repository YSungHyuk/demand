package net.smarthaccp.demand.vo;

import java.util.List;

import lombok.Data;

@Data
public class RequestVO {
	// 세부
	private Integer idx;
	private String type;
	private String title;
	private String company;
	private String requester;
	private String request_date;
	private String state;
	private String priority;
	private String create_date;
	private String content;
	private List<requestFileVO> files;
}
