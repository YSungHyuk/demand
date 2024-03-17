package net.smarthaccp.demand.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.SiteVO;

@Mapper
public interface ManagementsMapper {

	List<Map<String,Object>> getSiteNameList(SearchInfoVO searchInfo);

	void insertSiteMaster(SiteVO site);
	void insertSiteDetail(SiteVO site);

	List<SiteVO> getSiteList(SearchInfoVO searchInfo);

	SiteVO selectSite(String site_idx);

	void updateSiteMaster(SiteVO site);
	void updateSiteDetail(SiteVO site);

	void deleteSite(String site_idx);

}
