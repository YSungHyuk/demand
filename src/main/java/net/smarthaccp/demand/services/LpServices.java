package net.smarthaccp.demand.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.LpMapper;

@Service
public class LpServices {

	@Autowired
	private LpMapper lpMapper;
	
	public List<Map<String, Object>> getInfoList() {
		return lpMapper.selectInfoList();
	}

}
