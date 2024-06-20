<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>관리사이트 등록</title>
	<link rel="stylesheet" href="/resources/css/etc/file.css">
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<script src="${pageContext.request.contextPath }/resources/js/dummy/order_insert.js"></script>
	<form id="form">
		<div class="container mt-3">
			<div class="row">
				<div class="col-12">
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="dummy_start_date">시작일</label>
						<div class="col-sm-6">
							<input type="text" autocomplete="off" class="form-control" name="dummy_start_date" id="dummy_start_date" required readonly>
						</div>
						<div class="col-sm-4">
							<select class="form-select" name="" id="">
								<option value="1" selected>01:00</option>
								<option value="2">02:00</option>
							</select>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="dummy_end_date">종료일</label>
						<div class="col-sm-6">
							<input type="text" autocomplete="off" class="form-control" name="dummy_end_date" id="dummy_end_date" required readonly>
						</div>
						<div class="col-sm-4">
							<select class="form-select" name="" id="">
								<option value="1" selected>01:00</option>
								<option value="2">02:00</option>
							</select>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="company">품목명</label>
						<div class="col-sm-10" data-bs-toggle="modal" data-bs-target="#itemSearch">
							<input type="hidden" name="site_idx" id="site_idx" required>
							<input type="text" autocomplete="off" class="form-control" name="company" id="company" required readonly>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_port">접속포트</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_port" id="site_port" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="db_type">DB종류</label>
						<div class="col-sm-6">
							<select class="form-select" aria-label="Default select example" name="db_type" id="db_type">
								<option value="MARIA" selected>MariaDB</option>
								<option value="MYSQL">MySQL</option>
								<option value="ORACLE">ORACLE</option>
							</select>
						</div>
						<div class="col-sm-4">
							<input type="text" autocomplete="off" class="form-control" name="db_port" id="db_port" placeholder="접속포트">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="db_name">DB명</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="db_name" id="db_name">
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-sm-2 col-form-label">계정정보</div>
						<div class="col-sm-5">
							<input type="text" autocomplete="off" class="form-control" name="db_id" id="db_id" placeholder="아이디">
						</div>
						<div class="col-sm-5">
							<input type="password" autocomplete="off" class="form-control" name="db_pw" id="db_pw" placeholder="비밀번호">
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row text-center">
					<div class="col">
						<div class="btn-group" role="group">
							<button type="button" id="submitBtn" class="btn btn-outline-secondary">등록</button>
							<button type="button" id="resetBtn" class="btn btn-outline-secondary">초기화</button>
							<button type="button" id="closeBtn" class="btn btn-outline-secondary">닫기</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	<div class="modal fade" id="itemSearch" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="itemSearch" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="itemSearch">품목명 조회</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="container">
						<div class="row">
							<div class="col">
								<div class="input-group mb-3">
									<input type="text" class="form-control" id="searchBox">
									<button type="button" id="selectGrid" class="btn btn-outline-secondary">조회</button>
									<span>
										<i class="fa fa-search" aria-hidden="true"></i>
									</span>
								</div>
							</div>
						</div>
						<div id="companyGrid" class="row">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

