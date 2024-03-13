package net.smarthaccp.demand.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.SiteManagementsMapper;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Service
public class SiteManagementsService {

	@Autowired
	private SiteManagementsMapper siteMapper;

	public List<Map<String,Object>> getSiteNameList(SearchInfoVO searchInfo) {
		return siteMapper.getSiteNameList(searchInfo);
	}

}
