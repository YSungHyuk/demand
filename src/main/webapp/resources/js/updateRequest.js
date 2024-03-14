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

// file drag & drop
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
			<div class="thumbnail">
				<img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입 이미지" class="image">
			</div>
			<div class="details">
				<header class="header">
					<span class="name">${file.name}</span>
					<span class="size">${file.size}</span>
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
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg pointer" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
				</svg>
			</div>
	    `;
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

function initView(gridAreaId,gridId,pickerId) {
	$("#"+gridAreaId).append(`<div id="${gridId}" class="col-sm-12"></div>`);
	
	// 그리드 생성
	grid = new tui.Grid({
		el: document.getElementById(gridId)
		, scrollX: false
		, scrollY: true
		, bodyHeight: 300
		, columns: [
			{
				header: '관리번호'
				, name: 'site_idx'
				, align: 'center'
			},
			{
				header: '회사명'
				, name: 'site_company_name'
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
					$("#company").val(row.valueMap.site_company_name.value);
					grid.clear();
					$("#searchBox").val('');
					$("#cpSearch").modal('hide');
				}
			}
		} 
	});

	$('#'+pickerId).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	});
	
}

// 조회 버튼
function initfunc() {
	// 그리드 조회
	function getGrid() {
		let keyword = $("#searchBox").val();
		
		fetch('/api/siteManagements/companyNameSearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify({
				searchKeyword:keyword
			})
		})
		.then(response => response.json())
		.then(siteNameList => {
			console.log(siteNameList);
			grid.resetData(siteNameList);
			grid.refreshLayout();
		})
		.catch(error => console.error(error));
	};

	// 검색
	$("#selectGrid").on("click",getGrid);
	
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
		
//		for (const pair of new FormData($("#form")[0]).entries()) {
//			if(pair[0] != 'file') request[pair[0]] = pair[1];
//		}
		
		for (let i=0; i < uploadList.length; i++) {
			if(uploadList[i] !== undefined) formData.append("files",uploadList[i]);  
		}
		
		for (let i=0; i < deleteList.length; i++) {
			if(deleteList[i] !== undefined) formData.append("deleteList",deleteList[i]);  
		}
		
		
		formData.append("request", new Blob([JSON.stringify(request)],{type: "application/json"}));
		
		fetch('/api/requirements/request', {
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