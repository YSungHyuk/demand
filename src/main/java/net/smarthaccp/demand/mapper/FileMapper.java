package net.smarthaccp.demand.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import net.smarthaccp.demand.vo.FileVO;

@Mapper
public interface FileMapper {

	int insertFile(FileVO file);
	
	List<FileVO> getFileList(String file_idx);

	int selectMaxSeq(String file_idx);

	void deleteFile(@Param("deleteList") List<String> deleteList, @Param("file_idx")String file_idx);
}
