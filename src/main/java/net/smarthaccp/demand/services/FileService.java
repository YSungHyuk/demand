package net.smarthaccp.demand.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.mapper.FileMapper;
import net.smarthaccp.demand.vo.FileVO;

@Service
public class FileService {

	@Autowired
	private FileMapper fileMapper;
	
	@Autowired
	private KeyService keyService;
	
	private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    
    @Value("${uploadDir}")
    private String uploadDir;
    
    public String FileUpload(
    		List<MultipartFile> files
    		, HttpSession session
    		, String file_idx) {
    	
    	if(files != null && files.size() > 0) {
    		String saveDir = session.getServletContext().getRealPath(uploadDir);
    		String subDir = "";
    		
    		Date date = new Date();
    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
    		subDir = sdf.format(date);
    		saveDir += "/" + subDir;
    		
    		Path path = Paths.get(saveDir);
    		try {
    			Files.createDirectories(path);
    		} catch (IOException e) {
    			logger.debug("==== 경로 생성 실패 ====");
    			e.printStackTrace();
    		}
    		
    		int seq = 1;
    		
    		if(file_idx == null || file_idx.equals("0")) {
    			file_idx = keyService.selectKey("FILE");
    		} else {
    			seq = fileMapper.selectMaxSeq(file_idx);
    		}
    		
    		for(MultipartFile file : files) {
    			String uuid = UUID.randomUUID().toString();
    			String file_name = uuid.substring(0, 8)+"_"+file.getOriginalFilename();
    			String file_path = uploadDir+"/"+subDir;
    			
    			if(file.getOriginalFilename().length() == 0) continue;
    			
    			FileVO vo = new FileVO();
    			
    			vo.setFile_idx(file_idx);
    			vo.setFile_name(file.getOriginalFilename());
    			vo.setFile_extension(FilenameUtils.getExtension(file_name));
    			vo.setSeq(seq);
    			vo.setFile_path(file_path);
    			vo.setUuid(uuid.substring(0, 8));
    			
    			if(fileMapper.insertFile(vo) > 0) {
    				try {
    					file.transferTo(new File(saveDir, file_name));
    				} catch (IllegalStateException e) {
    					e.printStackTrace();
    				} catch (IOException e) {
    					e.printStackTrace();
    				}
    			}
    			
    			seq++;
    		}
    	}
    	
    	return file_idx;
    }
    
    public String FileUpdate(
    		List<MultipartFile> files
    		, List<Integer> deleteList
    		, HttpSession session
    		, String file_idx) {
    	
    	file_idx = FileUpload(files, session, file_idx);
    	
    	List<FileVO> fileList = fileMapper.getFileList(file_idx);

    	for(FileVO data : fileList) {
    		for(int seq : deleteList) {
    			if(data.getSeq() == seq) {
    				File file = new File(session.getServletContext().getRealPath(data.getFile_path())+File.separator+data.getUuid()+"_"+data.getFile_name());
    				if(file.exists()) file.delete();
    			}
    		}
    	}
    	
    	fileMapper.deleteFile(deleteList, file_idx);
    	
    	if(fileMapper.getFileList(file_idx).size() == 0) file_idx = null;
    	
    	return file_idx;
    }
    
	public List<FileVO> getFileList(String file_idx) {
		return fileMapper.getFileList(file_idx);
	}
}
