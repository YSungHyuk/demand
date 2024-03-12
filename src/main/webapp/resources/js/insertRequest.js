/**
 * 
 */

$(function() {
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
		
		let fileInputs = $("input[name=file]");
		
		for (let i=0; i < fileInputs.length; i++) {
			let files = fileInputs[i].files;
			for (let j=0; j < files.length; j++) {
				formData.append("files",files[j]);
			}
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
			console.log(response.status);
		})
		.then(data => console.log(data))
		.catch(error => console.error(error));
		
	});
	
	$("#resetBtn").on("click",function() {
		location.reload(true)
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
		  }

		  function handleFiles(files) {
			    files = [...files];
			    files.forEach(previewFile);
		  }

		  function previewFile(file) {
		    console.log(file);
		    fileList.appendChild(renderFile(file));
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
		      <div>
		      </div>
		    `;
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
		
		console.log(JSON.stringify(dropFile));
	
})




//const fileAdd = () => {
//	let html = 
//		"<div class='row mb-3'>"
//		+ "<div class='col input-group'>"
//		+ "<input class='form-control file' type='file' accept='image/*' name='file'>"
//		+ "<button class='delBtn btn btn-outline-secondary visually-hidden' type='button'>삭제</button>"
//		+ "</div>"
//		+ "</div>";
//
//	$("#file-group").append(html);
//	
//	$("input[type=file]").on("change",function(e) {
//		if (e.target.files.length == 0) {
//			$(this).next().addClass('visually-hidden');
//		} else {
//			$(this).next().removeClass('visually-hidden');
//			$(this).blur();
//			fileAdd();
//		}
//	});
//	
//	$(".delBtn").on("click",function() {
//		$(this).parent().parent().remove();
//	});
//}
