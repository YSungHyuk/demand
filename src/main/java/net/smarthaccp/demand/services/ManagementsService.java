package net.smarthaccp.demand.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.ManagementsMapper;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Service
public class ManagementsService {

	@Autowired
	private ManagementsMapper siteMapper;

	public List<Map<String,Object>> getSiteNameList(SearchInfoVO searchInfo) {
		return siteMapper.getSiteNameList(searchInfo);
	}

}
