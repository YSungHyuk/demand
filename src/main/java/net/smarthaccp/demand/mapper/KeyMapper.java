package net.smarthaccp.demand.mapper;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.KeyVO;

@Mapper
public interface KeyMapper {

	KeyVO selectKey(String keyType);

	void insertKey(KeyVO vo);

	void updateKey(KeyVO vo);

}
