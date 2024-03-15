package net.smarthaccp.demand.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.SearchInfoVO;

@Mapper
public interface ManagementsMapper {

	List<Map<String,Object>> getSiteNameList(SearchInfoVO searchInfo);

}
