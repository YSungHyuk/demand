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
import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.SiteVO;

@Controller
@RequestMapping(value="/api/managements")
public class ManagementsController {
	
	private static final Logger logger = LoggerFactory.getLogger(ManagementsController.class);
	
	
	@Autowired
	private ManagementsService siteService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private KeyService keyService;
	
	@ResponseBody
	@RequestMapping(value="siteNameSearch", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity<List<Map<String,Object>>> getSiteNameList(@RequestBody SearchInfoVO searchInfo) {
		
		List<Map<String,Object>> siteNameList = siteService.getSiteNameList(searchInfo);

		return ResponseEntity.ok(siteNameList);
	}
	
	@RequestMapping(value="insert")
	public String createSite() {
		return "managements/site_insert";
	}
	
	@ResponseBody
	@RequestMapping(value="insert", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> createSite(
			@RequestPart(value="site", required=false) SiteVO site
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files) {
		
		logger.info(site.toString());
		
		if(files != null && files.size() > 0) {
			try {
				site.setFile_idx(fileService.FileUpload(files, session, "0"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		site.setSite_idx(keyService.selectKey("SITE"));
		siteService.insertSite(site);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity getSiteList(@RequestBody SearchInfoVO searchInfo) {
		
		int listLimit = searchInfo.getListLimit();
		int pageNum = searchInfo.getPageNum();
		
		List<SiteVO> siteList = siteService.getSiteList(searchInfo);
		
		searchInfo.deleteStartRow();
		searchInfo.deleteListLimit();
		
		int listCount = siteService.getSiteList(searchInfo).size();
		
		int pageListLimit = 5;
		int maxPage = listCount / listLimit + (listCount % listLimit > 0 ? 1 : 0);
		int startPage = (pageNum - 1) / pageListLimit * pageListLimit + 1;
		int endPage = startPage + pageListLimit - 1;
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		PageInfoVO pageInfo = new PageInfoVO();
		pageInfo.setListCount(listCount);
		pageInfo.setPageListLimit(pageListLimit);
		pageInfo.setMaxPage(maxPage);
		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);
		pageInfo.setPageNum(pageNum);
		
		Map<String, Object> result = new HashMap<String,Object>();
		
		result.put("siteList",siteList);
		
		result.put("pageInfo",pageInfo);
		
		return ResponseEntity.ok(result);
	}
	
	@RequestMapping(value="update/{site_idx}")
	public String updateRequest(
				@PathVariable(name="site_idx") String site_idx
				, Model model) {
		
		SiteVO site = siteService.selectSite(site_idx);
		model.addAttribute("site", site);

		if(site.getFile_idx() != null && !site.getFile_idx().trim().isEmpty()) {
			List<FileVO> files = fileService.getFileList(site.getFile_idx());
			model.addAttribute("files", files);
		}
		
		return "managements/site_update";
	}
	
	@ResponseBody
	@RequestMapping(value="update", method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> updateSite(
			@RequestPart(value="site", required=false) SiteVO site
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files
			, @RequestPart(value="deleteList", required=false) List<Integer> deleteList) {
		
		if(deleteList != null && deleteList.size() > 0) {
			site.setFile_idx(fileService.FileUpdate(files, deleteList, session, site.getFile_idx()));
		} else {
			site.setFile_idx(fileService.FileUpload(files, session, site.getFile_idx()));
		}
		
		siteService.updateRequest(site);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="delete/{site_idx}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteSite(
			@PathVariable(name="site_idx") String site_idx) {
		
		siteService.deleteSite(site_idx);
		
		return ResponseEntity.ok().build();
	}
}
