package net.smarthaccp.demand.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.HandlerMapper;
import net.smarthaccp.demand.vo.HandlerVO;

@Service
public class HandlerService {

	@Autowired
	private HandlerMapper handlerMapper;

	public HandlerVO selectHandle(String handle_idx) {
		return handlerMapper.selectHandle(handle_idx);
	}

	public void insertHandle(HandlerVO handle) {
		handlerMapper.insertHandle(handle);
	}

}
