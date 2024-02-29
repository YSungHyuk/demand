package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class requestFileVO {
	// 요구사항 파일
	private Integer idx;
	private Integer seq;
	private String file_name;
	private String file_path;
	private String create_date;
}
