package net.smarthaccp.demand.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.smarthaccp.demand.mapper.ExtQryMapper;
import net.smarthaccp.demand.util.JdbcUtil;
import net.smarthaccp.demand.vo.extQryVO;

@Service
public class DummyService {

	@Autowired
	private ExtQryMapper extQryMapper;

	private Connection con;
	
	private static final Logger logger = LoggerFactory.getLogger(DummyService.class);
	
	public List<Map<String, Object>> extGetItemList(extQryVO extQry) {
		String keyWord = extQry.getSearchKeyword();
		List<Map<String,Object>> itemList = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			con = JdbcUtil.getConnection(extQry.getSite());
			String sql = "SELECT I.ITEM_CD, I.ITEM_NM, C.SUB_NM FROM TB_MES_ITEM000 I LEFT JOIN TB_MES_CD100 C ON C.MAIN_CD = 'ITEM_TYPE' AND I.ITEM_TYPE = C.SUB_CD "
					+ "WHERE I.USE_YN = 'Y' "
					+ "AND C.DATA1 = 'P' ";
			
			if(!keyWord.equals("") && keyWord != null){
				sql += "AND ITEM_NM like '%" + keyWord + "%";
			}
			pstmt = con.prepareStatement(sql);
			itemList = new ArrayList<>();
			rs = pstmt.executeQuery();
			while(rs.next()) {
				Map<String,Object> map = new HashMap<String,Object>();
				map.put("itemCd",rs.getString("ITEM_CD"));
				map.put("itemNm",rs.getString("ITEM_NM"));
				itemList.add(map);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.close(rs);
			JdbcUtil.close(pstmt);
			JdbcUtil.close(con);
		}
		
		logger.info(itemList.toString());
		
		return itemList;
	}
}
