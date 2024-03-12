package net.smarthaccp.demand.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.KeyMapper;
import net.smarthaccp.demand.vo.KeyVO;

@Service
public class KeyService {

	@Autowired
	private KeyMapper keyMapper;
	
	private static final Logger logger = LoggerFactory.getLogger(KeyService.class);
    
//    @SuppressWarnings("null")
	public String selectKey(String keyType) {
    	
    	KeyVO vo = null; 
    	vo = keyMapper.selectKey(keyType);
    	
    	LocalDate now = LocalDate.now();
    	
    	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yy-MM");
    	
    	String keyData = now.format(formatter).replace("-", "");
    	
    	if(vo == null) {
    		vo = new KeyVO();
    		vo.setKey_type(keyType);
    		vo.setKey_data(keyData);
    		vo.setSeq("0001");
    		keyMapper.insertKey(vo); 
    		return vo.resultKey();
    	} else {
    		if(!vo.getKey_data().equals(keyData)) {
    			vo.setKey_data(keyData);
    			vo.setSeq("0");
    		}
    		keyMapper.updateKey(vo);
    		vo = keyMapper.selectKey(keyType);
    		return vo.resultKey();
    	}
    }
}
