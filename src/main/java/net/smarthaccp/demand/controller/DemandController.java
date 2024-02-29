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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.services.DemandService;
import net.smarthaccp.demand.services.FileService;
import net.smarthaccp.demand.vo.PageInfoVO;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Controller
@RequestMapping(value="/requirements")
public class DemandController {
	
	private static final Logger logger = LoggerFactory.getLogger(DemandController.class);
	
	@Autowired
	private DemandService demandServices;
	
	@Autowired
	private FileService fileService;
	
	@SuppressWarnings("rawtypes")
	@ResponseBody
	@RequestMapping(value= "getRequestList", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public ResponseEntity getRequestList(@RequestBody SearchInfoVO request) {
		
		int listLimit = request.getListLimit();
		int pageNum = request.getPageNum();
		
		List<RequestVO> requestList = demandServices.getRequestList(request);
		
		request.deleteStartRow();
		request.deleteListLimit();
		
		int listCount = demandServices.getRequestList(request).size();
		
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
		
		logger.info(requestList.toString());
		
		result.put("pageInfo",pageInfo);
		
		return ResponseEntity.ok(result);
	}
	
	@RequestMapping(value="request")
	public String registRequirement(
			Model model
			,@RequestParam Map<String, Object> data) {
		
		if(data.containsKey("idx")) {
			RequestVO vo = new RequestVO();
			vo.setIdx(Integer.parseInt(String.valueOf(data.get("idx"))));
			RequestVO request = demandServices.selectRequest(vo);
			request.setFiles(demandServices.getRequestFileList(vo));
			model.addAttribute("request",request);
		} else {
			logger.info("키없음");
		}
		
		model.addAttribute("type",data.get("type"));
		model.addAttribute("title",data.get("title"));
		
		return "request/request";
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public String requestMain() {
		return "request/mainRequest";
	}
	
	@RequestMapping(value="registRequest", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Map<String,Object>> registRequirement(
			@RequestPart(value="request", required=false) RequestVO request
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files) {
		
		int insertCount = demandServices.insertRequest(request);
		
		Map<String,Object> result = new HashMap<String, Object>();
		String msg = null;
		String page = null;
		
		if(insertCount > 0) {
			RequestVO vo = demandServices.selectRequest(request);
			int idx = vo.getIdx();
			try {
				fileService.FileUpload(idx, files, session);
				msg = "등록완료";
				page = "/close";
			} catch (Exception e) {
				msg = "파일 업로드실패";
				e.printStackTrace();
			}
		} else {
			msg = "데이터 저장실패";
		}
		
		result.put("msg",msg);
		result.put("page",page);

		return ResponseEntity.ok(result);
	}
	
}
