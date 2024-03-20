/**
 * 
 */

let startDate;
let endDate;
let pageNum = 1;
const reg = /\d{4}-\d{2}-\d{2}/g;
let uploadList = [];
let fileidx = 0;

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
				, name: 'req_idx'
				, hidden: true
			},
			{
				header: '유형'
				, width: 70
				, name: 'type'
				, align: 'center'
			},
			{
				header: '제목'
				, name: 'title'
				, align: 'center'
				, formatter: function(item) {
					let viewer = `
					<div class="viewer" data-bs-toggle="modal" data-bs-target="#viewer" value=${item.row.req_idx}>
						${item.value}
					</div>
					`;
					
					return viewer;
				}
			},
			{
				header: '회사'
				, width: 200
				, name: 'site_name'
				, align: 'center'
			},
			{
				header: '요청자'
				, width: 100
				, name: 'requester'
				, align: 'center'
			},
			{
				header: '요청일'
				, width: 100
				, name: 'request_date'
				, align: 'center'
				, sortable: true
			},
			{
				header: '상태'
				, width: 70
				, name: 'state'
				, align: 'center'
				, sortable: true
			},
			{
				name: 'update'
				, align: 'center'
				, width: 55
				, formatter: function() {
					let addBtn = "<button type='button' class='btn btn-sm btn-outline-secondary'>수정</button>";
					return addBtn;
				}
			},
			{
				name: 'delete'
				, align: 'center'
				, width: 55
				, formatter: function() {
					let addBtn = "<button type='button' class='btn btn-sm btn-outline-secondary delete'>삭제</button>";
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
		} else if(e.columnName === 'delete') {
			// raw data 와 rowKey 비교 구문
			for(let row of e.instance.store.viewport.rows) {
				if(row.rowKey === rowKey) itemDelete(row.valueMap.req_idx.value);
			}			
		} else if(e.columnName === 'title') {
			for(let row of e.instance.store.viewport.rows) {
				if(row.rowKey === rowKey) itemSelect(row.valueMap.req_idx.value);
			}	
			
		}
		
	});

	dropFile("drop-file","files");

	// 그리드용 데이터 조회
	const getGrid = () => {
		let keyword = $("#search_box").val();
		let searchType = $("#search_type").val();
		let listLimit = $("#listLimit").val();
		let startRow = (pageNum-1)*listLimit;
		
		fetch('/api/requirements', {
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
	
		let url = '/api/requirements/insert';
		let target = 'Insert Requirement';
		let option = 'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes';

		window.open(url,target,option);
	});
	
	// 처리 버튼 클릭
	$("#handleBtn").on("click",function() {
		$("#viewer").modal("hide");
		
		let idx = $(this).val();
		
		fetch(`/api/handler/select/${idx}`)
		.then(response => response.json())
		.then(result => {
			viewer(result);
		})
		.catch(error => console.error(error));
		
		
		if(handle_idx === undefined) {
			console.log("없음")
		} else {
			console.log("있음")
		}
	})
	
	getGrid();
});

// 아이템 수정
const itemUpdate = idx => {
	
	let _width = '1000';
	let _height = '510';
    let _left = Math.ceil((window.screen.width - _width )/2);
    let _top = Math.ceil((window.screen.height - _height )/2); 

	let url = `/api/requirements/update/${idx}`;
	let target = 'Update Requirement';
	let option = 'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes';
	
	window.open(url,target,option);
}

// 아이템 삭제
const itemDelete = idx => {
	let isDelete = confirm("삭제하시겠습니까?");

	if(isDelete) {
		fetch(`/api/requirements/delete/${idx}`, {
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

const itemSelect = idx => {
	fetch(`/api/requirements/select/${idx}`)
	.then(response => response.json())
	.then(result => {
		viewer(result);
	})
	.catch(error => console.error(error));
}

const viewer = item => {
	
	let request = item.request;
	let files = item.files;
	let path = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
	
	$("#viewer").find(".modal-body").empty();
	let body = `
	<div class="container">
		<div class="row" id="modalRow">
			<div class="col-12 col-lg-6" id="modalCol">
				<div class="row mb-3 mt-3 align-items-center">
					<div class="col-6">
						<div class="container">
							<div class="row align-items-center">
								<label class="col-sm-4 col-form-label">유형</label>
								<div class="col-sm-8">
									<div class="input-group">
										<div class="form-check me-3">
											<input class="form-check-input" type="radio" name="type" id="type1" value="신규" onclick="return(false);">
											<label class="form-check-label" for="type1">신규</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="type" id="type2" value="결함" onclick="return(false);">
											<label class="form-check-label" for="type2">결함</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-6 align-items-center">
						<div class="container">
							<div class="row align-items-center">
								<label class="col-sm-4 col-form-label">우선순위</label>
								<div class="col-sm-8">
									<div class="input-group">
										<div class="form-check me-3">
											<input class="form-check-input" type="radio" name="priority" id="priority1" value="보통" onclick="return(false);">
											<label class="form-check-label" for="priority1">보통</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" type="radio" name="priority" id="priority2" value="긴급" onclick="return(false);">
											<label class="form-check-label" for="priority2">긴급</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row mb-3">
					<label class="col-sm-2 col-form-label" for="company">회사</label>
					<div class="col-sm-10">
						<input type="hidden" name="site_idx" id="site_idx">
						<input type="text" class="form-control" id="company" readonly>
					</div>
				</div>
				<div class="row mb-3">
					<label class="col-sm-2 col-form-label" for="requester">요청자</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="requester" readonly>
					</div>
				</div>
				<div class="row mb-3">
					<label class="col-sm-2 col-form-label" for="request_date">요청일</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="request_date" readonly>
					</div>
				</div>
				<div class="row mb-3">
					<label class="col-sm-2 col-form-label" for="title">제목</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="title" readonly>
					</div>
				</div>
				<div class="row mb-3">
					<label class="col-sm-2 col-form-label" for="content">내용</label>
					<div class="col-sm-10">
						<textarea class="form-control" id="content" rows="11" readonly style="resize:none;"></textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
	`;
	$("#viewer").find(".modal-body").append(body);
	
	$("input[name=priority]").each(function() {
		if($(this).val() == request.priority) $(this).attr('checked','checked');
	})
	
	$("input[name=type]").each(function() {
		if($(this).val() == request.type) $(this).attr('checked','checked');
	})
	
	$("#company").val(request.site_name);
	$("#requester").val(request.requester);
	$("#request_date").val(request.request_date);
	$("#title").val(request.title);
	$("#content").val(request.content);
	$("#handleBtn").val(request.req_idx);
	if(request.handle_idx !== null) {
		$("#handleBtn").text("처리내용");
	} else {
		$("#handleBtn").text("처리");
	}
	
	if(files === undefined || request.file_idx === null) {
		$("#modalCol").removeClass('col-lg-6');
	} else {
		body = `
			<div class="col-12 col-lg-6">
				<div id="Carousel" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
					</div>
					<div class="carousel-inner">
					</div>
					<button class="carousel-control-prev" type="button"
						data-bs-target="#Carousel" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button"
						data-bs-target="#Carousel" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
				<div id="files" class="files mb-3">
				</div>
			</div>
		`;
		$("#modalRow").append(body);
		
		for(let data of files) {
			let fileSrc = path+data.file_path+"/"+data.uuid+"_"+data.file_name;
			let noImageSrc = "https://img.icons8.com/pastel-glyph/2x/image-file.png";
			
			if(data.file_type === 'image') {
				let indicators = `
					<button type="button" data-bs-target="#Carousel" data-bs-slide-to="${data.seq }" class="active" aria-current="true" aria-label="Slide ${data.seq }"></button>
				`;
				$(".carousel-indicators").append(indicators);
				
				let inner = `
				    <div class="carousel-item ${data.seq === 1 ? 'active' : ''}">
			        	<img src="${fileSrc}" class="d-block modal-carousel" alt="첨부이미지${data.seq}">
				    </div>
				`;
				$(".carousel-inner").append(inner);
			}
			
			let file = `
				<div class="file">
					<div class="thumbnail">
						<img src="${data.file_type === 'image' ? fileSrc : noImageSrc}" alt="${data.file_name}" class="image">
					</div>
					<div class="details">
						<header class="header">
							<span class="name downloadFile pointer">
								<input type="hidden" value="${fileSrc}" id="${data.file_name }">
								${data.file_name}
							</span>
							<span class="size">${sizeFormat(data.file_size)}</span>
						</header>
					</div>				
				</div>
			`
			$("#viewer").find(".files").append(file);
		}
	}
	
	
	// 파일 다운로드 기능,, 아 코드 언제 다수정하냐...
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

// file drag & drop 언젠가 이놈도 수정해서 common.js으로 넣기
function dropFile(dropAreaId, fileListId) {
	let dropArea = document.getElementById(dropAreaId);
	let fileList = document.getElementById(fileListId);

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function highlight(e) {
		preventDefaults(e);
		dropArea.classList.add("highlight");
	}

	function unhighlight(e) {
		preventDefaults(e);
		dropArea.classList.remove("highlight");
	}

	function handleDrop(e) {
		unhighlight(e);
		let dt = e.dataTransfer;
		let files = dt.files;
		
		handleFiles(files);

		const fileList = document.getElementById(fileListId);
		if (fileList) {
			fileList.scrollTo({ top: fileList.scrollHeight });
		}
		
		deleteFile();
	}

	function handleFiles(files) {
		files = [...files];
		files.forEach(previewFile);
	}

	function previewFile(file) {
		fileList.appendChild(renderFile(file));
		imageModal();
	}
	
	function imageModal() {
		$(".image").on("click",function() {
			$("#modal-body-img").attr('src',$(this).attr('src'));		
		})
	}	
	
	function readerFile(file, callback) {
	    let reader = new FileReader();
	    
	    reader.onload = function(e) {
	        let src;
	        if(file.type.split('/')[0] === 'image') {
	            src = e.target.result;
	        } else {
	            src = "https://img.icons8.com/pastel-glyph/2x/image-file.png";
	        }
	        callback(src);
	    };
	    
	    reader.readAsDataURL(file);
	}
	
	function addUploadList(file) {
		uploadList[fileidx] = file;
		fileidx++;
	}
	
	function deleteFile() {
		$(".fileDelete").on("click",function() {
			let idx = $(this).attr('id').split('_')[1];
			delete uploadList[idx];
			$(this).parent().remove();
		})
	}
	

	function renderFile(file) {
		let fileDOM = document.createElement("div");
		fileDOM.className = "file";
		fileDOM.innerHTML = `
			<div class="thumbnail" data-bs-toggle="modal" data-bs-target="#thumbnail">
				<img src="" alt="파일타입 이미지" class="image pointer">
			</div>
			<div class="details">
				<header class="header">
					<span class="name">${file.name}</span>
					<span class="size">${sizeFormat(file.size)}</span>
				</header>
				<div class="progress">
					<div class="bar"></div>
				</div>
				<div class="status">
					<span class="percent">100% done</span>
					<span class="speed">90KB/sec</span>
				</div>
			</div>
			<div class="fileDelete deleteHover" id="delete_${fileidx}">
				<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg pointer" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
				</svg>
			</div>
	    `;
		readerFile(file,function(src) {
	        const image = fileDOM.querySelector('.image');
	        image.src = src;
		});
	    
	    addUploadList(file);
		return fileDOM;
	}

	dropArea.addEventListener("dragenter", highlight, false);
	dropArea.addEventListener("dragover", highlight, false);
	dropArea.addEventListener("dragleave", unhighlight, false);
	dropArea.addEventListener("drop", handleDrop, false);

	return {
		handleFiles
	};
}
