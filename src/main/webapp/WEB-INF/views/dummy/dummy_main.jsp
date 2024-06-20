<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>더미데이터 관리</title>
    <style>
        .half-height {
            height: 50vh; /* 각 행이 화면 높이의 50%를 차지하도록 설정 */
        }
    </style>
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<script src="${pageContext.request.contextPath }/resources/js/dummy/dummy_main.js"></script>
	<script type="text/javascript">
		let idx = "${site.site_idx}";
	</script>
    <div class="container-fluid">
        <div class="row half-height d-flex align-items-center">
            <div class="col-sm-6 d-flex align-items-center justify-content-center border border-secondary border-3 h-100">
                원재료입고
            </div>
            <div class="col-sm-6 d-flex align-items-center justify-content-center border border-secondary border-3 h-100 pointer" id="order">
                작업지시
            </div>
        </div>
        <div class="row half-height d-flex align-items-center">
            <div class="col-sm-6 d-flex align-items-center justify-content-center border border-secondary border-3 h-100">
                제품출하
            </div>
            <div class="col-sm-6 d-flex align-items-center justify-content-center border border-secondary border-3 h-100">
                ???
            </div>
        </div>
    </div>
</body>
</html>