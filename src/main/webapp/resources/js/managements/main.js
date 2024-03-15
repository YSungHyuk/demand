/**
 * 
 */

let startDate;
let endDate;
let pageNum = 1;
const reg = /\d{4}-\d{2}-\d{2}/g;

$(function() {
	// 시작일 datepicker 생성
	$('#StartDate').datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		startDate = dateFormat(e.date);
		$("#EndDate").datepicker('setStartDate', e.date);
	});
	
	// 종료일 datepicker 생성
	$('#EndDate').datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		endDate = dateFormat(e.date);
		$("#StartDate").datepicker('setEndDate', e.date);
	});
	
	// 그리드 생성
	const grid = new tui.Grid({
		el: document.getElementById('grid-view')
		, scrollX: false
		, scrollY: false
//		, scrollY: true
		, bodyHeight: 500
		, columns: [
			{
				header: '번호'
				, width: 70
				, name: 'seq_idx'
				, align: 'center'
			    , sortingType: 'desc'
			},
			{
				header: '번호'
				, name: 'site_idx'
				, hidden: true
			},
			{
				header: '회사명'
				, width: 70
				, name: 'site_company_name'
				, align: 'center'
			},
			{
				header: '사업단위'
				, name: 'business_level'
				, align: 'center'
			},
			{
				header: '상태'
				, width: 200
				, name: 'state'
				, align: 'center'
			},
			{
				name: 'update'
				, align: 'center'
				, width: 55
				, formatter: function(item) {
					let addBtn = "<button type='button' class='btn btn-sm btn-outline-secondary update' data-type='update'>수정</button>";
					return addBtn;
				}
			},
			{
				name: 'delete'
				, align: 'center'
				, width: 55
				, formatter: function(item) {
					let addBtn = "<button type='button' class='btn btn-sm btn-outline-secondary delete' data-type='delete'>삭제</button>";
					return addBtn;
				}
			},
		],
		header: {
			height:60
			, complexColumns: [
				{
					header: '관리'
					, name: 'mgrBtnGroup'
					, hideChildHeaders: true // 자식 헤더를 숨김
					, childNames: ['update','delete']
				}
			]
		}
	});
	
	grid.on("click", function (e) {
		let rowKey = e.rowKey;
		if(e.columnName === 'update') {
			// raw data 와 rowKey 비교 구문
			for(let row of e.instance.store.viewport.rows) {
				if(row.rowKey === rowKey) itemUpdate(row.valueMap.req_idx.value);
			}
		} else if(e.columnName === 'delete' ) {
			// raw data 와 rowKey 비교 구문
			for(let row of e.instance.store.viewport.rows) {
				if(row.rowKey === rowKey) itemDelete(row.valueMap.req_idx.value);
			}			
		}
		
	});

	// 그리드용 데이터 조회
	const getGrid = () => {
		let keyword = $("#search_box").val();
		let searchType = $("#search_type").val();
		let listLimit = $("#listLimit").val();
		let startRow = (pageNum-1)*listLimit;
		
		fetch('/api/managements', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify({
				startDate:startDate
				, endDate:endDate
				, pageNum:pageNum
				, startRow:startRow
				, listLimit:listLimit
				, searchType:searchType
				, searchKeyword:keyword
			})
		})
		.then(response => response.json())
		.then(result => {
			pageList(result.pageInfo);
			grid.resetData(result.requestList);
			grid.refreshLayout();
		})
		.catch(error => console.error(error));
	};

	// 조회 버튼
	$("#selectGrid").on("click",getGrid);
	
	// 검색 엔터기능
    $("#search_box").on("keydown", function(e){
        if(e.keyCode === 13) getGrid();
    });
	
	// 페이지리스트 가공
	const pageList = pageInfo => {
		$("#pageList").empty();
		
		// 버튼 출력태그 저장
		let page = '';
		
		// 이전 버튼 판별
		if(pageNum > 1)	$("#pp").append("<input type='button' class='btn btn-sm' id='prvsPage' value='이전'>");
		
		// 페이지목록 생성
		for (let i=pageInfo.startPage; i<= pageInfo.endPage; i++) {
			if (pageNum == i) {
				page += "<span class='pageMove'><input type='hidden' value='"+i+"'><b>"+i+"</b></span>";
			} else {
				page += "<span class='pageMove'><input type='hidden' value='"+i+"'>"+i+"</span>";
			}
		}
		
		// 다음 버튼 판별
		if(pageNum < pageInfo.maxPage) $("#np").append("<input type='button' class='btn btn-sm' id='nextPage' value='다음'>");
		
		// 저장된 태그 출력
		$("#pageList").append(page)
		
		// 페이지 다음버튼 클릭이벤트
	    $("#nextPage").on("click",function() {
	        if (pageNum > 0) {
	            pageNum++; 
	            getGrid();    
	        }
	    });
		
		// 페이지 이전버튼 클릭이벤트
		$("#prvsPage").on("click",function() {
	        if (pageNum > 1) {
	            pageNum--; 
	            getGrid();    
	        }
	    });
	    
	    // 페이지목록 클릭이벤트
	    $(".pageMove").on("click",function() {
			pageNum = $(this).children().val();
			getGrid();
		})
	}
	
	// 아이템 등록
	$("#inser_item").on("click",function() {
		let _width = '1000';
		let _height = '510';
	    let _left = Math.ceil((window.screen.width - _width )/2);
	    let _top = Math.ceil((window.screen.height - _height )/2); 
	
		let url = '/api/managements/insert';
		let target = 'Insert Site';
		let option = 'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes';

		window.open(url,target,option);
	});
	
	getGrid();
});

//날짜 변환
const dateFormat = data => {
	let date = new Date(data)
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
}

// 아이템 수정
const itemUpdate = idx => {
	
	let _width = '1000';
	let _height = '510';
    let _left = Math.ceil((window.screen.width - _width )/2);
    let _top = Math.ceil((window.screen.height - _height )/2); 

	let url = `/api/managements/update/${idx}`;
	let target = 'Update Site';
	let option = 'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes';
	
	window.open(url,target,option);
}

// 아이템 삭제
const itemDelete = idx => {
	let isDelete = confirm("삭제하시겠습니까?");

	if(isDelete) {
		fetch(`/api/managements/delete/${idx}`, {
				method: 'DELETE',
				header: {}
		})		
		.then(response => {
			if(response.status === 200) {
				location.reload(true);
			}
		})
		.catch(error => console.error(error));
	}
}

// post 방식으로 새창열기
const postOpen = (verb, url, data, target) => {
    let form = document.createElement("form");
    form.action = location.origin + url;
    form.verb = verb;
    form.target = target || "_self";
    if (data) {
    	for (let key in data) {
	        let input = document.createElement("textarea");
	        input.name = key;
	        input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
	        form.appendChild(input);
    	}
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
}