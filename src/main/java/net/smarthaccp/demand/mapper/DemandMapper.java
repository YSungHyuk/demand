package net.smarthaccp.demand.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.requestFileVO;

@Mapper
public interface DemandMapper {

	List<RequestVO> getRequestList(SearchInfoVO request);

	int insertRequest(RequestVO request);

	RequestVO selectRequest(RequestVO request);

	List<requestFileVO> getRequestFileList(RequestVO request);
}
