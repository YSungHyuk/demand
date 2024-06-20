package net.smarthaccp.demand.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.smarthaccp.demand.services.FileService;
import net.smarthaccp.demand.services.KeyService;
import net.smarthaccp.demand.services.ManagementsService;
import net.smarthaccp.demand.vo.SiteVO;

@Controller
@RequestMapping(value="/api/dummy")
public class DummyController {
	
	private static final Logger logger = LoggerFactory.getLogger(DummyController.class);
	
	
	@Autowired
	private ManagementsService siteService;
	
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
}
