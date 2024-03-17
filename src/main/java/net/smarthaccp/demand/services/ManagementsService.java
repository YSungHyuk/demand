package net.smarthaccp.demand.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.ManagementsMapper;
import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.SiteVO;

@Service
public class ManagementsService {

	@Autowired
	private ManagementsMapper siteMapper;

	public List<Map<String,Object>> getSiteNameList(SearchInfoVO searchInfo) {
		return siteMapper.getSiteNameList(searchInfo);
	}

	public void insertSite(SiteVO site) {
		siteMapper.insertSiteMaster(site);
		siteMapper.insertSiteDetail(site);
		
	}

	public List<SiteVO> getSiteList(SearchInfoVO searchInfo) {
		return siteMapper.getSiteList(searchInfo);
	}

	public SiteVO selectSite(String site_idx) {
		return siteMapper.selectSite(site_idx);
	}

	public void updateRequest(SiteVO site) {
		siteMapper.updateSiteMaster(site);
		siteMapper.updateSiteDetail(site);
		
	}

	public void deleteSite(String site_idx) {
		siteMapper.deleteSite(site_idx);
		
	}

}
