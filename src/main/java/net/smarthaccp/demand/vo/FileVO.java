package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class FileVO {
	// 요구사항 파일
	private String file_idx;
	private Integer seq;
	private String uuid;
	private String file_name;
	private String file_path;
	private String create_date;
	private String update_date;
}