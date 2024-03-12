package net.smarthaccp.demand.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.DemandMapper;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Service
public class DemandService {

	@Autowired
	private DemandMapper demandMapper;
	
	public List<RequestVO> getRequestList(SearchInfoVO request) {
		return demandMapper.getRequestList(request);
	}

	public int insertRequest(RequestVO request) {
		return demandMapper.insertRequest(request);
	}

	public RequestVO selectRequest(String req_idx) {
		return demandMapper.selectRequest(req_idx);
	}

	public int updateRequest(RequestVO request) {
		return demandMapper.updateRequest(request);
	}

}
