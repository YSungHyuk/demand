

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