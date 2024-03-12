<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>요구사항 등록</title>
	<link rel="stylesheet" href="/resources/css/insertRequest.css">
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<script src="/resources/js/insertRequest.js"></script>
	<form id="form" method="POST" enctype="multipart/form-data">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6">
					<div class="row mb-3 mt-3 align-items-center">
						<div class="col-6">
							<div class="container">
								<div class="row align-items-center">
									<label class="col-sm-4 col-form-label">유형</label>
									<div class="col-sm-8">
										<div class="input-group">
											<div class="form-check me-3">
												<input class="form-check-input" type="radio" name="type" id="type1" value="신규" checked>
												<label class="form-check-label" for="type1">신규</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="type" id="type2" value="결함">
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
											<div class="form-check me-3">
												<input class="form-check-input" type="radio" name="priority" id="priority1" value="보통" checked>
												<label class="form-check-label" for="priority1">보통</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="priority" id="priority2" value="긴급">
												<label class="form-check-label" for="priority2">긴급</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="company">회사</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="company" id="company" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="requester">요청자</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="requester" id="requester" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="request_date">요청일</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="request_date" id="request_date" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="title">제목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="title" id="title" required>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="content">내용</label>
						<div class="col-sm-10">
							<textarea class="form-control" name="content" id="content" rows="5" required></textarea>
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
</body>
</html>
