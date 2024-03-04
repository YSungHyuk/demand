package net.smarthaccp.demand.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.DemandMapper;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;
import net.smarthaccp.demand.vo.requestFileVO;

@Service
public class DemandService {

	@Autowired
	private DemandMapper demandMapper;
	
	public List<RequestVO> getRequestList(SearchInfoVO request) {
		return demandMapper.getRequestList(request);
	}

	public int createRequest(RequestVO request) {
		return demandMapper.createRequest(request);
	}

	public RequestVO selectRequest(RequestVO request) {
		return demandMapper.selectRequest(request);
	}

	public List<requestFileVO> getRequestFileList(RequestVO request) {
		return demandMapper.getRequestFileList(request);
	}

//	public int updateRequest(RequestVO request) {
//		return demandMapper.updateRequest(request);
//	}

}
