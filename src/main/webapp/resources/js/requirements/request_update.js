/**
 * 
 */

let uploadList = [];
let deleteList = [];
let fileidx = 0;
let grid;

$(function() {
	dropFile("drop-file", "files");
	initView('companyGrid','grid-view','request_date');
	initfunc();
});

function initView(gridAreaId,gridId,pickerId) {
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
				, name: 'site_idx'
				, width: '70'
				, align: 'center'
			},
			{
				header: '회사명'
				, name: 'site_name'
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
					$("#site_idx").val(row.valueMap.site_idx.value);
					$("#company").val(row.valueMap.site_name.value);
					grid.clear();
					$("#searchBox").val('');
					$("#cpSearch").modal('hide');
				}
			}
		} 
	});

	datePicker(pickerId);
}

function initfunc() {
	// 그리드 조회
	function getGrid() {
		let keyword = $("#searchBox").val();
		
		fetch('/api/managements/siteNameSearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify({
				searchKeyword:keyword
			})
		})
		.then(response => response.json())
		.then(siteNameList => {
			grid.resetData(siteNameList);
			grid.refreshLayout();
		})
		.catch(error => console.error(error));
	};

	// 검색
	$("#selectGrid").on("click", getGrid);
	
	// 검색 엔터기능
    $("#searchBox").on("keydown", function(e){
        if(e.keyCode === 13) {
        	getGrid();
        }
    });
    
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
		let request = {}
		
		for (const pair of new FormData($("#form")[0]).entries()) {
			if(pair[0] != 'file') request[pair[0]] = pair[1];
		}
		
		for (let i=0; i < uploadList.length; i++) {
			if(uploadList[i] !== undefined) formData.append("files",uploadList[i]);  
		}
		
		
		formData.append("deleteList", new Blob([JSON.stringify(deleteList)],{type: "application/json"}));
		formData.append("request", new Blob([JSON.stringify(request)],{type: "application/json"}));
		
		fetch(`/api/requirements/update`, {
			method: 'PUT',
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
	
	$(".oldFileDelete").on("click",function() {
		deleteList.push($(this).children('input[type=hidden]').val());
		$(this).parent().remove();
	});
	
	$(".downloadFile").on("click",function() {
		  const a = document.createElement("a")
		  const name = $(this).children('input[type=hidden]').attr('id');
		  const source = $(this).children('input[type=hidden').val();
		  a.href = source;
		  a.setAttribute('download',name);
		  a.click();
		  a.remove();
	});
}