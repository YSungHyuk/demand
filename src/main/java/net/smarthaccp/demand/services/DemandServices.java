package net.smarthaccp.demand.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.DemandMapper;

@Service
public class DemandServices {

	@Autowired
	private DemandMapper demandMapper;
	
	public List<Map<String, Object>> getRequestList(Map<String, Object> map) {
		return demandMapper.getRequestList(map);
	}

}
