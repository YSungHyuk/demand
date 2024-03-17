package net.smarthaccp.demand.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.RequirementsMapper;
import net.smarthaccp.demand.vo.RequestVO;
import net.smarthaccp.demand.vo.SearchInfoVO;

@Service
public class RequirementsService {

	@Autowired
	private RequirementsMapper requestMapper;
	
	public List<RequestVO> getRequestList(SearchInfoVO searchInfo) {
		return requestMapper.getRequestList(searchInfo);
	}

	public void insertRequest(RequestVO request) {
		requestMapper.insertRequest(request);
	}

	public RequestVO selectRequest(String req_idx) {
		return requestMapper.selectRequest(req_idx);
	}

	public void updateRequest(RequestVO request) {
		requestMapper.updateRequest(request);
	}

	public void deleteRequest(String req_idx) {
		requestMapper.deleteRequest(req_idx);
	}

}
