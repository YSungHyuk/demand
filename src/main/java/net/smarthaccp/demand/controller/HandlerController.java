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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.services.FileService;
import net.smarthaccp.demand.services.HandlerService;
import net.smarthaccp.demand.services.KeyService;
import net.smarthaccp.demand.vo.FileVO;
import net.smarthaccp.demand.vo.HandleVO;
import net.smarthaccp.demand.vo.RequestVO;

@Controller
@RequestMapping(value="/api/handler")
public class HandlerController {
	
	private static final Logger logger = LoggerFactory.getLogger(HandlerController.class);
	
	
	@Autowired
	private HandlerService handlerService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private KeyService keyService;
	
	@ResponseBody
	@RequestMapping(value="insert", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> createHandle(
			@RequestPart(value="handle", required=false) HandleVO handle
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files) {
		
		if(files != null && files.size() > 0) {
			try {
				handle.setFile_idx(fileService.FileUpload(files, session, "0"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		handle.setHandle_idx(keyService.selectKey("HANDLE"));
		handlerService.insertHandle(handle);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="select/{handle_idx}", method = RequestMethod.GET)
	public ResponseEntity selectHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
		HandleVO handle = handlerService.selectHandle(handle_idx);
		
		if(handle != null) {
			if(handle.getFile_idx() != null && !handle.getFile_idx().trim().isEmpty()) {
				handle.setFiles(fileService.getFileList(handle.getFile_idx()));
			}
		}
		
		return ResponseEntity.ok(handle);
	}
	
	
	@ResponseBody
	@RequestMapping(value="update", method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = "application/json; charset=UTF-8")
	public ResponseEntity<Void> updateHandle(
			@RequestPart(value="handle", required=false) HandleVO handle
			, HttpSession session
			, @RequestPart(value="files", required=false) List<MultipartFile> files
			, @RequestPart(value="deleteList", required=false) List<Integer> deleteList) {
		
		if(deleteList != null && deleteList.size() > 0) {
			handle.setFile_idx(fileService.FileUpdate(files, deleteList, session, handle.getFile_idx()));
		} else {
			handle.setFile_idx(fileService.FileUpload(files, session, handle.getFile_idx()));
		}
		
		handlerService.updateHandle(handle);
		
		return ResponseEntity.ok().build();
	}
	
	@ResponseBody
	@RequestMapping(value="delete/{handle_idx}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteHandle(
			@PathVariable(name="handle_idx") String handle_idx) {
		
//		handlerService.deleteSite(handle_idx);
		
		return ResponseEntity.ok().build();
	}
	
}
