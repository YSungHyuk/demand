package net.smarthaccp.demand.services;

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
    
    public String selectKey(String KeyType) {
    	KeyVO vo = null; 
    	vo = keyMapper.selectKey(KeyType);
    	
    	if(vo == null) {
    		// 키 생성
    	} else {
    		// 키 날짜비교
    	}
    	
    	return "";
    }

}
