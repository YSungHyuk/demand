package net.smarthaccp.demand.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {

	int insertFile(Map<String, Object> map);

}
