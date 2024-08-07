package net.smarthaccp.demand.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Mapper
public interface ExtQryMapper {

	List<RequestVO> getRequestList(SearchInfoVO request);

	RequestVO selectRequest(String req_idx);

	void insertRequest(RequestVO request);

	void updateRequest(RequestVO request);

	void deleteRequest(String req_idx);
}
