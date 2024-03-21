package net.smarthaccp.demand.vo;

import java.util.List;

import lombok.Data;

@Data
public class HandleVO {
	// 처리
	private String handle_idx;
	private String req_idx;
	private String handle_contents;
	private String handler;
	private String file_idx;
	private String completion_date;
	private List<FileVO> files;
}
