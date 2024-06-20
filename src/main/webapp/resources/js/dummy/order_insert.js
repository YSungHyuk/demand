/**
 * 
 */

let grid;

$(function() {
	dateRangePicker('dummy_start_date','dummy_end_date');
	initView('companyGrid','grid-view');
	initfunc();
});

// 조회 버튼
function initfunc() {
    // 초기화
	$("#resetBtn").on("click",function() {
		location.reload(true);
	});
	
	// 닫기
	$("#closeBtn").on("click",function() {
		close();
	});
    
    // 등록
	$("#submitBtn").on("click",function() {
		let formData = new FormData();
		let site = {}
		
		for (const pair of new FormData($("#form")[0]).entries()) {
			if(pair[0] != 'file') site[pair[0]] = pair[1];
		}
		
		for (let i=0; i < uploadList.length; i++) {
			if(uploadList[i] !== undefined) formData.append("files",uploadList[i]);  
		}
		
		formData.append("site", new Blob([JSON.stringify(site)],{type: "application/json"}));
		
		console.log("formData : ", JSON.stringify(formData));
		
		fetch('/api/managements/insert', {
			method: 'POST',
			headers: {},
			body: formData
		})
		.then(response => {
			if(response.status === 200) {
				location.href='/close';
			}
		})
		.catch(error => console.error(error));
	});
}   

function initView(gridAreaId,gridId) {
	$("#"+gridAreaId).append(`<div id="${gridId}" class="col-sm-12"></div>`);
	
	// 그리드 생성
	grid = new tui.Grid({
		el: document.getElementById(gridId)
		, scrollX: false
		, scrollY: true
		, bodyHeight: 250
		, columns: [
			{
				header: '관리번호'
				, name: 'itemCd'
				, align: 'center'
			},
			{
				header: '회사명'
				, name: 'itemNm'
				, align: 'center'
			},
			{
				header: '선택'
				, name: 'select'
				, align: 'center'
				, width: 55
				, formatter: function() {
					let addBtn = `<button type='button' class='btn btn-sm btn-outline-secondary'>선택</button>`;
					return addBtn;
				}
			},
		],
	});
	grid.on("click", function (e) {
		let rowKey = e.rowKey;
		if(e.columnName === 'select') {
			// raw data 와 rowKey 비교 구문
			for(let row of e.instance.store.viewport.rows) {
				if(row.rowKey === rowKey) {
					$("#itemCd").val(row.valueMap.itemCd.value);
					$("#itemNm").val(row.valueMap.itemNm.value);
					grid.clear();
					$("#itemSearch").modal('hide');
				}
			}
		} 
	});
}

