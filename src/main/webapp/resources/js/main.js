/**
 * 
 */

$(function() {
	$(".design-name").on("click",function() {
		let id = $(this).attr('id');
		func(this);
	});
	
	hideView("main");
})

const func = _this => {
	$(".title").text($(_this).text());
	
	hideView(_this.id);
	
	if(_this.id == 'requirements') {
		/* ajax 호출 및 자료 그리기*/
	} else if (_this.id == 'managementSite') {
		/* ajax 호출 및 자료 그리기*/
	}
	
};

const hideView = id => {
	$("div[role='article']").each(function(i) {
		if ($(this).hasClass(id)) {
			$(this).removeClass('hide');
		} else {
			$(this).addClass('hide');
		}
	});
}

