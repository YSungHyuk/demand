package net.smarthaccp.demand.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Mapper
public interface RequirementsMapper {

	List<RequestVO> getRequestList(SearchInfoVO request);

	RequestVO selectRequest(String req_idx);

	int insertRequest(RequestVO request);

	int updateRequest(RequestVO request);

	void deleteRequest(String req_idx);
}
