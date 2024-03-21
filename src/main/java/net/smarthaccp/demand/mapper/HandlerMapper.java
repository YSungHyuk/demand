package net.smarthaccp.demand.mapper;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.HandleVO;


@Mapper
public interface HandlerMapper {

	HandleVO selectHandle(String handle_idx);

	void insertHandle(HandleVO handle);

	void updateHandle(HandleVO handle);

}
