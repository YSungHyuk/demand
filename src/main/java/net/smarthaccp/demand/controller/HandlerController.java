package net.smarthaccp.demand.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.services.FileService;
import net.smarthaccp.demand.services.KeyService;
import net.smarthaccp.demand.services.ManagementsService;
import net.smarthaccp.demand.vo.FileVO;
import net.smarthaccp.demand.vo.PageInfoVO;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.SiteVO;

@Controller
@RequestMapping(value="/api/handler")
public class HandlerController {
	
	private static final Logger logger = LoggerFactory.getLogger(HandlerController.class);
	
	
	@Autowired
	private ManagementsService siteService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private KeyService keyService;
	
	@ResponseBody
	@RequestMapping(value="insert/{handle_idx}", method = RequestMethod.POST)
	public ResponseEntity<Void> insertHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
//		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="select/{handle_idx}", method = RequestMethod.GET)
	public ResponseEntity<Void> selectHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
		logger.info(handle_idx);
		
//		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
	
	
	@ResponseBody
	@RequestMapping(value="update/{handle_idx}", method = RequestMethod.PUT)
	public ResponseEntity<Void> updateHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
//		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="delete/{handle_idx}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
//		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
	
}
