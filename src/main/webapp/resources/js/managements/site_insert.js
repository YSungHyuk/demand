/**
 * 
 */

let uploadList = [];
let fileidx = 0;
let grid;

$(function() {
	dropFile("drop-file", "files");
	dateRangePicker('business_start_date','business_end_date');
	initfunc();
});

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
		
		console.log("formData : ", JSON.stringify(formData));
		
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

