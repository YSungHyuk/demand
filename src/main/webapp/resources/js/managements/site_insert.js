/**
 * 
 */

let uploadList = [];
let fileidx = 0;
let grid;

$(function() {
	dropFile("drop-file", "files");
	initView('business_start_date','business_end_date');
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

function initView(pickersId,pickereId) {
	
	$(`#${pickersId}`).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		startDate = dateFormat(e.date);
		$(`#${pickereId}`).datepicker('setStartDate', e.date);
	});
	
	// 종료일 datepicker 생성
	$(`#${pickereId}`).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		endDate = dateFormat(e.date);
		$(`#${pickersId}`).datepicker('setEndDate', e.date);
	});
	
	
}

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

