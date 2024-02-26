package net.smarthaccp.demand.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public class FileUtils {
	private static final Logger logger = LoggerFactory.getLogger(FileUtils.class);
    
    @Value("${uploadDir}")
    private String uploadDir;
 
    public List<Map<String, Object>> FileUpload(@RequestParam int idx, MultipartFile[] file) throws Exception {
        
        List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
 
        File target = new File(uploadDir);
        if(!target.exists()) target.mkdirs();
        
        for(int i=0; i<file.length; i++) {
 
            String orgFileName = file[i].getOriginalFilename();
            String orgFileExtension = orgFileName.substring(orgFileName.lastIndexOf("."));
            String saveFileName = UUID.randomUUID().toString().replaceAll("-", "") + orgFileExtension;
            Long saveFileSize = file[i].getSize();
            
            logger.debug("================== file start ==================");
            logger.debug("파일 실제 이름: "+orgFileName);
            logger.debug("파일 저장 이름: "+saveFileName);
            logger.debug("파일 크기: "+saveFileSize);
            logger.debug("content type: "+file[i].getContentType());
            logger.debug("================== file   END ==================");
 
            target = new File(uploadDir, saveFileName);
            file[i].transferTo(target);
            
            Map<String, Object> fileInfo = new HashMap<String, Object>();
 
            fileInfo.put("ORG_FILE_NAME", orgFileName);
            fileInfo.put("SAVE_FILE_NAME", saveFileName);
            fileInfo.put("FILE_SIZE", saveFileSize);
            fileList.add(fileInfo);
            
        }
        return fileList;
    }
}
