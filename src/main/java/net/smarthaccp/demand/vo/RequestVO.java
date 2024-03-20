package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class RequestVO {
	// 세부
	private String req_idx;
	private String seq_idx;
	private String type;
	private String title;
	private String content;
	private String site_idx;
	private String site_name;
	private String requester;
	private String request_date;
	private String state;
	private String priority;
	private String file_idx;
	private String handle_idx;
	private String create_date;
	private String update_date;
}
