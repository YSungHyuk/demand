package net.smarthaccp.demand.mapper;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.HandlerVO;


@Mapper
public interface HandlerMapper {

	HandlerVO selectHandle(String handle_idx);

	void insertHandle(HandlerVO handle);

}
