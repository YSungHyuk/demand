/**
 * 
 */

$(function() {
	
	let uploadList = [];
	let fileidx = 0;
	
	$('#request_date').datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	});
	
	$("#submitBtn").on("click",function() {
		let url = '/api/requirements/request';
		let formData = new FormData();
		let request = {}
		
		for (const pair of new FormData($("#form")[0]).entries()) {
			if(pair[0] != 'file') request[pair[0]] = pair[1];
		}
		
		
		for (let i=0; i < uploadList.length; i++) {
			if(uploadList[i] !== undefined) formData.append("files",uploadList[i]);  
		}
		
		formData.append("request", new Blob([JSON.stringify(request)],{type: "application/json"}));
		
		fetch('/api/requirements/request', {
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
	
	$("#resetBtn").on("click",function() {
		location.reload(true);
	});
	
	$("#closeBtn").on("click",function() {
		close();
	});
	
	function DropFile(dropAreaId, fileListId) {
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
				<div class="fileDelete" id="delete_${fileidx}">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
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
	
	const dropFile = new DropFile("drop-file", "files");
	
	
})


