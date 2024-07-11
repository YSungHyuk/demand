package net.smarthaccp.demand.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

import net.smarthaccp.demand.services.DummyService;
import net.smarthaccp.demand.services.ManagementsService;
import net.smarthaccp.demand.vo.SiteVO;
import net.smarthaccp.demand.vo.extQryVO;
import net.smarthaccp.demand.vo.workOrderVO;

@Controller
@RequestMapping(value="/api/dummy")
public class DummyController {
	
	private static final Logger logger = LoggerFactory.getLogger(DummyController.class);
	
	
	@Autowired
	private ManagementsService siteService;
	
	@Autowired
	private DummyService dummyService;
	
	@RequestMapping(value="{site_idx}")
	public String main(
				@PathVariable(name="site_idx") String site_idx
				, Model model) {
		
		SiteVO site = siteService.selectSite(site_idx);
		model.addAttribute("site", site);

		return "dummy/dummy_main";
	}
	
	@RequestMapping(value="order/{site_idx}")
	public String createOrder(
				@PathVariable(name="site_idx") String site_idx
				, Model model) {
		
		SiteVO site = siteService.selectSite(site_idx);
		model.addAttribute("site", site);

		return "dummy/order_insert";
	}
	
	@ResponseBody
	@RequestMapping(value="delete/{site_idx}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteSite(
			@PathVariable(name="site_idx") String site_idx) {
		
		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="extGetItemList", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<List<Map<String,Object>>> extGetItemList(
			@RequestBody extQryVO extQry) {
		
		extQry.setSite(siteService.selectSite(extQry.getIdx()));
		
		List<Map<String,Object>> itemList = dummyService.extGetItemList(extQry);

		return ResponseEntity.ok(itemList);
	}
	
	@ResponseBody
	@RequestMapping(value="orderInsert", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> insertOrder(
				@RequestPart(value="workOrder", required=false) workOrderVO workOrder
				, Model model) {
		
		workOrder.setSite(siteService.selectSite(workOrder.getIdx()));

		logger.info(workOrder.toString());
		
		return ResponseEntity.ok().build();
	}
	
	
}
