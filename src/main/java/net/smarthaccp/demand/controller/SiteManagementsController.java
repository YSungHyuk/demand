package net.smarthaccp.demand.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.smarthaccp.demand.services.KeyService;
import net.smarthaccp.demand.services.SiteManagementsService;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Controller
@RequestMapping(value="/api/siteManagements")
public class SiteManagementsController {
	
	private static final Logger logger = LoggerFactory.getLogger(SiteManagementsController.class);
	
	@Autowired
	private KeyService keyService;
	
	@Autowired
	private SiteManagementsService siteService;
	
	@ResponseBody
	@RequestMapping(value="companyNameSearch", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<List<Map<String,Object>>> getSiteNameList(@RequestBody SearchInfoVO searchInfo) {
		
		List<Map<String,Object>> siteNameList = siteService.getSiteNameList(searchInfo);

		return ResponseEntity.ok(siteNameList);
	}
}
