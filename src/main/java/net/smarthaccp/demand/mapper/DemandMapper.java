package net.smarthaccp.demand.mapper;

import java.util.List;
import java.util.Map;

public interface DemandMapper {

	List<Map<String, Object>> getRequestList(Map<String, Object> map);

}
