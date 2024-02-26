<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>REQUESTINSERT</title>
	<link rel="stylesheet" href="/resources/css/dist/bootstrap.css">
	<link rel="stylesheet" href="/resources/css/dist/bootstrap-datepicker.min.css">
	<script src="/resources/js/dist/jquery-3.7.0.js"></script>
	<script src="/resources/js/dist/bootstrap.js"></script>
	<script src="/resources/js/dist/bootstrap-datepicker.min.js"></script>
	<script src="/resources/js/dist/bootstrap-datepicker.ko.min.js"></script>
	<script src="/resources/js/registRequirement.js"></script>
	<style type="text/css">
		#form {
			min-width: 300px;
			min-height: 700px;
		}
	</style>
</head>
<body>
	<form id="form" action="/api/v1/registRequirement" method="POST" enctype="multipart/form-data">
		<div class="container">
			<div class="row mb-3 mt-3 align-items-center">
				<div class="col-6">
					<div class="container">
						<div class="row align-items-center">
							<label class="col-sm-4 col-form-label">유형</label>
							<div class="col-sm-8">
								<div class="input-group">
									<div class="form-check mr-3">
										<input class="form-check-input" type="radio" name="type" id="type1" checked>
										<label class="form-check-label" for="type1">신규</label>
									</div>
									<div class="form-check">
										<input class="form-check-input" type="radio" name="type" id="type2">
										<label class="form-check-label" for="type2">결함</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6 align-items-center">
					<div class="container">
						<div class="row align-items-center">
							<label class="col-sm-4 col-form-label">우선순위</label>
							<div class="col-sm-8">
								<div class="input-group">
									<div class="form-check mr-3">
										<input class="form-check-input" type="radio" name="priority" id="priority1" checked>
										<label class="form-check-label" for="priority1">보통</label>
									</div>
									<div class="form-check">
										<input class="form-check-input" type="radio" name="priority" id="priority2">
										<label class="form-check-label" for="priority2">긴급</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row mb-3 align-items-center">
				<label class="col-sm-2 col-form-label" for="company">회사</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" name="company" id="company">
				</div>
			</div>
			<div class="row mb-3 align-items-center">
				<label class="col-sm-2 col-form-label" for="requester">요청자</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" name="requester" id="requester">
				</div>
			</div>
			<div class="row mb-3 align-items-center">
				<label class="col-sm-2 col-form-label" for="request_date">요청일</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" name="request_date" readonly id="request_date">
				</div>
			</div>
			<div class="row mb-3 align-items-center">
				<label class="col-sm-2 col-form-label" for="centent">내용</label>
				<div class="col-sm-10">
					<textarea class="form-control" name="centent" id="centent" rows="5"></textarea>
				</div>
			</div>
			<div class="row mb-3 align-items-center">
				<input type="file" class="form-control" name="file" id="file">
			</div>
			<div class="input-group mb-3 justify-content-center row">
				<button type="submit" class="btn">등록</button>
				<button type="reset" class="btn">초기화</button>
				<button type="button" class="btn">닫기</button>
			</div>
		</div>
	</form>
</body>
</html>
