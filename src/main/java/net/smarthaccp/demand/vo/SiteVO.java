package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class SiteVO {
	// Master
	private String site_idx;
	private String seq_idx;
	private String site_name;
	private String site_ceo;
	private String business_level;
	private String business_start_date;
	private String business_end_date;
	private String state;
	private String file_idx;
	private String create_date;
	private String update_date;
	
	// Detail
	private String site_url;
	private String site_port;
	private String db_type;
	private String db_port;
	private String db_name;
	private String db_id;
	private String db_pw;
	
}
