

/**
 * 
 */
 
//날짜 변환
const dateFormat = data => {
	let date = new Date(data)
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
}

// 사이즈 변환
const sizeFormat = size => {
	const text = ['bytes','KB','MB','GB','TB','PB'];
	let e = Math.floor(Math.log(size)/Math.log(1024));
	
	return (size/Math.pow(1024,e)).toFixed(2)+" "+text[e];
}

// Method 새창열기
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

// 파일 드래그앤 드랍
// let uploadList = [];
// let deleteList = [];
// let fileidx = 0;
const dropFile = (dropAreaId, fileListId) => {
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

// 범위 데이트피커
const dateRangePicker = (startDateId,endDateId) => {
		$(`#${startDateId}`).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		startDate = dateFormat(e.date);
		$(`#${endDateId}`).datepicker('setStartDate', e.date);
	});
	
	$(`#${endDateId}`).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
	    todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	}).on('changeDate',function(e) {
		endDate = dateFormat(e.date);
		$(`#${startDateId}`).datepicker('setEndDate', e.date);
	});
}

// 단일 데이트 피커
const datePicker = dateId => {
	$(`#${dateId}`).datepicker({
	    format: 'yyyy-mm-dd',
	    autoclose: true,
		todayHighlight: true,
	    clearBtn: true,
	    disableTouchKeyboard: true,
	    language: 'ko'
	});
	
}
