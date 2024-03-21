package net.smarthaccp.demand.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.HandlerMapper;
import net.smarthaccp.demand.vo.HandleVO;

@Service
public class HandlerService {

	@Autowired
	private HandlerMapper handlerMapper;

	public HandleVO selectHandle(String handle_idx) {
		return handlerMapper.selectHandle(handle_idx);
	}

	public void insertHandle(HandleVO handle) {
		handlerMapper.insertHandle(handle);
	}

	public void updateHandle(HandleVO handle) {
		handlerMapper.updateHandle(handle);
		
	}

}
