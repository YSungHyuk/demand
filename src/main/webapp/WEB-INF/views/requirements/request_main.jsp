<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>요구사항</title>
</head>
<%-- 
<style>
	.tui-grid-cell .tui-grid-cell-content{
		overflow: auto;
	}
</style>
--%>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<nav>
		<jsp:include page="../inc/nav.jsp" />
	</nav>
	<script src="${pageContext.request.contextPath }/resources/js/requirements/request_main.js"></script>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 d-none d-lg-block">
			    <div class="flex-row d-flex justify-content-between">
					<div class="col-10 px-1">
						<div class="input-group">
							<label for="StartDate">
								<input type='text' id='StartDate' class='form-control form-control-sm text-center m-3' readonly="readonly" placeholder='시작일'>
							</label>
							<label for="EndDate"> 
								<input type='text' id='EndDate' class='form-control form-control-sm text-center m-3' readonly="readonly" placeholder='종료일'>
							</label>
						</div>
					</div>
					<div class="col-1 px-1">
						<select id="listLimit" class="form-select">
							<option value="10" selected>10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="40">40</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div id="grid-view" class="col-sm-12"></div>
		</div>
		
		<div class="row justify-content-between">
			<div class="col-sm-2"></div>
			<div class="col-sm-6 col-10 text-center">
				<div class="input-group mb-3">
					<select id="search_type" class="form-select form-select-sm">
						<option value="any" selected>전체</option>
						<option value="type">유형</option>
						<option value="title">제목</option>
						<option value="company">회사</option>
						<option value="state">상태</option>
					</select>
					<input type="text" class="form-control" id="search_box" aria-describedby="selectGrid" placeholder="검색">
					<button type="button" id="selectGrid" class="btn btn-outline-secondary">조회</button>
				</div>
			</div>
			<div class="col-2 text-center">
				<button id="inser_item" class="btn btn-outline-secondary">
					등록
				</button>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-1 text-center" id="pp"></div>
			<div id="pageList" class="col-md-1 text-center"></div>
			<div class="col-1 text-center" id="np"></div>
		</div>
	</div>
	<div class="modal fade" id="viewer" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewer" aria-hidden="true">
		<div class="modal-dialog modal-xl modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="viewer">상세정보</h5>
				</div>
				<div class="modal-body">
				</div>
			</div>
		</div>
	</div>
</body>
</html>