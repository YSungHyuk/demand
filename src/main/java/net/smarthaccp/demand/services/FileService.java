package net.smarthaccp.demand.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.smarthaccp.demand.mapper.FileMapper;

@Service
public class FileService {

	@Autowired
	private FileMapper fileMapper;
	
	private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    
    @Value("${uploadDir}")
    private String uploadDir;
    
    public void FileUpload(
    		int idx
    		, List<MultipartFile> files
    		, HttpSession session) {
    	
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
        
        for(MultipartFile file : files) {
        	String uuid = UUID.randomUUID().toString();
        	String file_name = uuid.substring(0, 8)+"_"+file.getOriginalFilename();
        	String file_path = uploadDir+"/"+subDir;
        	
        	if(file.getOriginalFilename().length() == 0) continue;
        	
            Map<String, Object> map = new HashMap<String,Object>();
            map.put("idx",idx);
            map.put("file_name",file_name);
            map.put("seq",seq);
            map.put("file_path",file_path);
            
            int insertCount = fileMapper.insertFile(map);
            
            if(insertCount > 0) {
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

}
