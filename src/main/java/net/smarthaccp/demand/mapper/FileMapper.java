package net.smarthaccp.demand.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import net.smarthaccp.demand.vo.FileVO;

@Mapper
public interface FileMapper {

	int insertFile(FileVO file);
	
	List<FileVO> getFileList(String file_idx);

}
