package net.smarthaccp.demand.vo;

import lombok.Data;

@Data
public class SiteVO {
	private String site_idx;
	private String site_company_name;
	private String web_id;
	private String web_pw;
	private String maintenance_start_date;
	private String maintenance_end_date;
	private String state;
	private String create_date;
}
