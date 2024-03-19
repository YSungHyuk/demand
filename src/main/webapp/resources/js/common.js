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