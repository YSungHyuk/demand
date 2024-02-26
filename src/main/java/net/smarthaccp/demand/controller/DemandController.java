package net.smarthaccp.demand.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.services.DemandServices;

@Controller
@RequestMapping(value="/api/v1")
public class DemandController {
	
	private static final Logger logger = LoggerFactory.getLogger(DemandController.class);
	
	@Autowired
	private DemandServices demandServices;
	
	@ResponseBody
	@RequestMapping(value= "getRequestList", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public String getRequestList(@RequestParam Map<String,Object> map) {
		
		int listLimit = Integer.parseInt(String.valueOf(map.get("listLimit")));
		int pageNum = Integer.parseInt(String.valueOf(map.get("pageNum")));
		
		
		List<Map<String,Object>> dataList = demandServices.getRequestList(map);
		map.remove("startRow");
		map.remove("listLimit");
		
		int listCount = demandServices.getRequestList(map).size();
		
		int pageListLimit = 5;
		int maxPage = listCount / listLimit + (listCount % listLimit > 0 ? 1 : 0);
		int startPage = (pageNum - 1) / pageListLimit * pageListLimit + 1;
		int endPage = startPage + pageListLimit - 1;
		if(endPage > maxPage) {
			endPage = maxPage;
		}
		
		Map<String, Object> pageInfo = new HashMap<String, Object>();
		pageInfo.put("listCount", listCount);
		pageInfo.put("pageListLimit", pageListLimit);
		pageInfo.put("maxPage", maxPage);
		pageInfo.put("startPage", startPage);
		pageInfo.put("endPage", endPage);
		pageInfo.put("pageNum", pageNum);
		
		dataList.add(pageInfo);
		
		JSONArray jsonArray = new JSONArray(dataList);
		
	    return jsonArray.toString();
	}
	
	@RequestMapping(value="registRequirement", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public String registRequirement() {
		return "requirements/registRequirement";
	}
	
	@RequestMapping(value="registRequirement", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	public String registRequirement(
			@RequestParam Map<String,Object> map
			, HttpSession session
			, MultipartFile[] file) {
		
		logger.info(map.toString());
		for(MultipartFile a : file) {
			logger.info(a.getName());
			logger.info(a.getOriginalFilename());
			logger.info(String.valueOf(a.getSize()));
		}
		
	    String uploadDir = "/resources/upload/car"; // 서버 이미지 저장 경로
	    String saveDir = session.getServletContext().getRealPath(uploadDir);
		
	    try {
	        Date date = new Date();
	        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
	        map.put("file_path",("/" + sdf.format(date)));
	        saveDir = saveDir + map.get("file_path");

	        Path path = Paths.get(saveDir);

	        Files.createDirectories(path);
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    
		return "";
	}
}
