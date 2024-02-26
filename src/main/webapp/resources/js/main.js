/**
 * 
 */

let startDate;
let endDate;
let pageNum = 1;
const reg = /\d{4}-\d{2}-\d{2}/g;

$(function() {
	$(".design-name").on("click",function() {
		let id = $(this).attr('id');
		func(this);
	});
	
//	showView("main");
	showView("requirements");
	
	// 사이드바 클릭 기능
	const func = _this => {
		$(".title").text($(_this).text());
		
		showView(_this.id);
		
		if(_this.id == 'requirements') {
			getGrid();
		} else if (_this.id == 'managementSite') {
			/* ajax 호출 및 자료 그리기*/
		}
	};
	
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
		, scrollY: true
//		, minBodyHeight: 30
//		, rowHeaders: ['rowNum']
//	    , pageOptions: {
//	    	useClient: true
//	        , perPage: 10
//	      }
		, bodyHeight: 400
		, columns: [
			{
				header: '순서번호'
				, name: 'idx'
				, align: 'center'
			    , sortingType: 'desc'
			},
			{
				header: '유형'
				, name: 'type'
				, align: 'center'
			},
			{
				header: '제목'
				, name: 'title'
				, align: 'center'
			},
			{
				header: '회사'
				, name: 'company'
				, align: 'center'
			},
			{
				header: '요청일'
				, name: 'request_date'
				, align: 'center'
				, sortable: true
			},
			{
				header: '상태'
				, name: 'state'
				, align: 'center'
				, sortable: true
			},
			{
				header: '등록일'
				, name: 'create_date'
				, align: 'center'
				, sortable: true
			},
		]
	});

	// 그리드용 데이터 조회
	const getGrid = () => {
//		console.log(startDate);
//		console.log(reg.test(startDate));
//		console.log(endDate);
//		console.log(reg.test(endDate));
		
		let keyword = $("#search_box").val();
		let searchType = $("#search_type").val();
		let listLimit = $("#listLimit").val();
		let startRow = (pageNum-1)*listLimit;
		$.ajax({
			type:"get"
			, url:"/api/v1/getRequestList"
			, contentType:"application/json; charset=UTF-8"
			, dataType:"json"
			, data: {
				startDate:startDate
				, endDate:endDate
				, pageNum:pageNum
				, startRow:startRow
				, listLimit:listLimit
				, searchType:searchType
				, searchKeyword:keyword
			}
			, success: function(result) {
				pageList(result.pop());
				grid.resetData(result);
				grid.refreshLayout();
			}
			, error: function(e) {
				console.log(e);
			}
		})
	};
	
	$("#selectGrid").on("click",function(){
		getGrid();
	});
	
	const pageList = pageInfo => {
		$("#pageList").empty();
		
		// 버튼 출력태그 저장
		let page = '';
		
		// 이전 버튼 판별
		if(pageNum > 1) {
			page += "<input type='button' id='prvsPage' value='이전'>";	
		}
		
		// 페이지목록 생성
		for (let i=pageInfo.startPage; i<= pageInfo.endPage; i++) {
			if (pageNum == i) {
				page += "<span class='pageMove'><input type='hidden' value='"+i+"'><b>"+i+"</b></span>";
			} else {
				page += "<span class='pageMove'><input type='hidden' value='"+i+"'>"+i+"</span>";
			}
		}
		
		// 다음 버튼 판별
		if(pageNum < pageInfo.maxPage) {
			page += "<input type='button' id='nextPage' value='다음'>";
		}
		
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
	
	$("#inser_item").on("click",function() {
		let _width = '500';
		let _height = '800';
		
	    let _left = Math.ceil((window.screen.width - _width )/2);
	    let _top = Math.ceil((window.screen.height - _height )/2); 
		
		window.open("/api/v1/registRequirement","Insert Requirement",'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes');
	});
	
	getGrid();
	
});



// 화면 출력
const showView = id => {
	$("div[role='article']").each(function(i) {
		if ($(this).hasClass(id)) {
			$(this).removeClass('hide');
		} else {
			$(this).addClass('hide');
		}
	});
}

//날짜 변환
const dateFormat = data => {
	let date = new Date(data)
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
}

