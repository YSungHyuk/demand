/**
 * 
 */

$(function() {
	initfunc();
});

function initfunc() {
	$("#order").on("click",function() {
		let _width = '1200';
		let _height = '590';
	    let _left = Math.ceil((window.screen.width - _width )/2);
	    let _top = Math.ceil((window.screen.height - _height )/2); 
	
		let url = `/api/dummy/order/${idx}`;
		let target = 'Work Order';
		let option = 'location=no, directories=no,resizable=yes,status=no,toolbar=no,menubar=no, width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars=yes';
		window.open(url,target,option);
		location.href='/close';
	});
}   
