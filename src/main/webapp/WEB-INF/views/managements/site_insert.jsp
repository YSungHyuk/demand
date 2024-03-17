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
	<script src="${pageContext.request.contextPath }/resources/js/managements/site_insert.js"></script>
	<form id="form">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6">
					<div class="row align-items-center">
						<label class="col-sm-2 col-form-label">사업단위</label>
						<div class="col-sm-10">
							<div class="input-group">
								<div class="form-check me-3">
									<input class="form-check-input" type="radio" name="business_level" id="level1" value="기초" checked>
									<label class="form-check-label" for="level1">기초</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="business_level" id="level2" value="고도화">
									<label class="form-check-label" for="level2">고도화</label>
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_name">회사명</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_name" id="site_name" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_ceo">대표이사</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_ceo" id="requester" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="business_start_date">사업시작</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="business_start_date" id="business_start_date" required readonly>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="business_end_date">사업종료</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="business_end_date" id="business_end_date" required readonly>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_url">URL</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_url" id="site_url" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_port">접속포트</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_port" id="site_port" required>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="upload-box mt-5">
						<div id="drop-file" class="drag-file">
							<img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일 아이콘" class="image">
							<p class="message">Drag files to upload</p>
						</div>
					</div>
					<div id="files" class="files mb-3">
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
	<div class="modal fade" id="thumbnail" data-bs-keyboard="false" tabindex="-1" aria-labelledby="thumbnail" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body">
					<img id="modal-body-img">
				</div>
			</div>
		</div>
	</div>
</body>
</html>

