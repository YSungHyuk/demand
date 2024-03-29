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

import net.smarthaccp.demand.services.RequirementsService;
import net.smarthaccp.demand.services.FileService;
import net.smarthaccp.demand.services.KeyService;
import net.smarthaccp.demand.vo.FileVO;
import net.smarthaccp.demand.vo.PageInfoVO;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Controller
@RequestMapping(value="/api/requirements")
public class RequirementsController {
	
	private static final Logger logger = LoggerFactory.getLogger(RequirementsController.class);
	
	@Autowired
	private RequirementsService requestService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private KeyService keyService;
	
	
	@RequestMapping(value="insert")
	public String createRequest() {
		return "requirements/request_insert";
	}
	
	@ResponseBody
	@RequestMapping(value="insert", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> createRequest(
			@RequestPart(value="request", required=false) RequestVO request
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files) {
		
		if(files != null && files.size() > 0) {
			try {
				request.setFile_idx(fileService.FileUpload(files, session, "0"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		request.setReq_idx(keyService.selectKey("REQ"));
		requestService.insertRequest(request);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity getRequestList(@RequestBody SearchInfoVO searchInfo) {
		
		int listLimit = searchInfo.getListLimit();
		int pageNum = searchInfo.getPageNum();
		
		List<RequestVO> requestList = requestService.getRequestList(searchInfo);
		
		searchInfo.deleteStartRow();
		searchInfo.deleteListLimit();
		
		int listCount = requestService.getRequestList(searchInfo).size();
		
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
		
		result.put("requestList",requestList);
		
		result.put("pageInfo",pageInfo);
		
		return ResponseEntity.ok(result);
	}
	
	@RequestMapping(value="update/{req_idx}")
	public String updateRequest(
				@PathVariable(name="req_idx") String req_idx
				, Model model) {
		
		RequestVO request = requestService.selectRequest(req_idx);
		model.addAttribute("request", request);

		if(request.getFile_idx() != null && !request.getFile_idx().trim().isEmpty()) {
			List<FileVO> files = fileService.getFileList(request.getFile_idx());
			model.addAttribute("files", files);
		}
		
		return "requirements/request_update";
	}
	
	@ResponseBody
	@RequestMapping(value="update", method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> updateRequest(
			@RequestPart(value="request", required=false) RequestVO request
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files
			, @RequestPart(value="deleteList", required=false) List<Integer> deleteList) {
		
		if(deleteList != null && deleteList.size() > 0) {
			request.setFile_idx(fileService.FileUpdate(files, deleteList, session, request.getFile_idx()));
		} else {
			request.setFile_idx(fileService.FileUpload(files, session, request.getFile_idx()));
		}
		
		requestService.updateRequest(request);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="delete/{req_idx}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteRequest(
			@PathVariable(name="req_idx") String req_idx) {
		
		requestService.deleteRequest(req_idx);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="select/{req_idx}")
	public ResponseEntity selectRequest(
			@PathVariable(name="req_idx") String req_idx) {

		Map<String, Object> result = new HashMap<String,Object>();
		
		RequestVO request = requestService.selectRequest(req_idx); 
		result.put("request",request);
		
		if(request.getFile_idx() != null && !request.getFile_idx().trim().isEmpty()) {
			List<FileVO> files = fileService.getFileList(request.getFile_idx());
			result.put("files", files);
		}
		
		return ResponseEntity.ok(result);
	}
}
