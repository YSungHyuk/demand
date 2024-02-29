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
		let url = '/requirements/registRequest';
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
		
		$.ajax({
			url: url
			, data : formData
			, type : 'POST'
			, success: function(result) {
				console.log(result.msg);
				location.href=result.page;
			},
			error: function(e) {
				console.log(e);
			}
			, cache: false
			, contentType: false
			, processData: false
		})
		
//		$("#form").submit();
	})
	$("#resetBtn").on("click",function() {
		location.reload(true)
	})
	$("#closeBtn").on("click",function() {
		close();
	})
	
	fileAdd();
})

const fileAdd = () => {
	let html = 
		"<div class='row mb-3'>"
		+ "<div class='col input-group'>"
		+ "<input class='form-control file' type='file' accept='image/*' name='file'>"
		+ "<button class='delBtn btn btn-outline-secondary visually-hidden' type='button'>삭제</button>"
		+ "</div>"
		+ "</div>";

	$("#file-group").append(html);
	
	$("input[type=file]").on("change",function(e) {
		if (e.target.files.length == 0) {
			$(this).next().addClass('visually-hidden');
		} else {
			$(this).next().removeClass('visually-hidden');
			$(this).blur();
			fileAdd();
		}
	});
	
	$(".delBtn").on("click",function() {
		$(this).parent().parent().remove();
	});
}