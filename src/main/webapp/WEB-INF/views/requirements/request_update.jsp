<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<html>
<head>
	<title>요구사항 수정</title>
	<link rel="stylesheet" href="/resources/css/etc/file.css">
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<script src="${pageContext.request.contextPath }/resources/js/requirements/request_update.js"></script>
	<form id="form" enctype="multipart/form-data">
		<input type="hidden" value="${request.req_idx }" name="req_idx">
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
												<input class="form-check-input" type="radio" name="type" id="type1" value="신규" <c:if test="${request.type eq '신규' }">checked</c:if>>
												<label class="form-check-label" for="type1">신규</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="type" id="type2" value="결함" <c:if test="${request.type eq '결함' }">checked</c:if>>
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
												<input class="form-check-input" type="radio" name="priority" id="priority1" value="보통" <c:if test="${request.priority eq '보통' }">checked</c:if>>
												<label class="form-check-label" for="priority1">보통</label>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="priority" id="priority2" value="긴급" <c:if test="${request.priority eq '긴급' }">checked</c:if>>
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
						<div class="col-sm-10" data-bs-toggle="modal" data-bs-target="#cpSearch">
							<input type="hidden" name="site_idx" value="${request.site_idx }">
							<input type="text" autocomplete="off" class="form-control" id="company" name="site_name" required readonly value="${request.site_name }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="requester">요청자</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="requester" id="requester" required value="${request.requester }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="request_date">요청일</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="request_date" id="request_date" required readonly value="${request.request_date }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="title">제목</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="title" id="title" required value="${request.title }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="content">내용</label>
						<div class="col-sm-10">
							<textarea class="form-control" autocomplete="off" name="content" id="content" rows="5">${request.content }</textarea>
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
						<c:if test="${request.file_idx ne null }">
							<input type="hidden" value="${request.file_idx }" name="file_idx">
							<c:forEach items="${files }" var="file" varStatus="status">
								<div class="file">
									<div class="thumbnail" data-bs-toggle="modal" data-bs-target="#thumbnail">
										<c:choose>
											<c:when test="${file.file_type eq 'image'}">
												<img src="${pageContext.request.contextPath}${file.file_path}/${file.uuid}_${file.file_name}" alt="이미지" class="image pointer">
											</c:when>
											<c:otherwise>
												<img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="파일타입" class="image pointer">
											</c:otherwise>
										</c:choose>
									</div>
									<div class="details">
										<header class="header">
											<span class="name downloadFile pointer">
												<input type="hidden" value="${pageContext.request.contextPath}${file.file_path}/${file.uuid}_${file.file_name}" id="${file.file_name }">
												${file.file_name}
											</span>
											<span class="size">${file.file_size }</span>
										</header>
									</div>
									<div class="oldFileDelete deleteHover">
										<input type="hidden" value="${file.seq}">
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg pointer" viewBox="0 0 16 16">
											<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
										</svg>
									</div>
								</div>
							</c:forEach>
						</c:if>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row text-center">
					<div class="col">
						<div class="btn-group" role="group">
							<button type="button" id="submitBtn" class="btn btn-outline-secondary">수정</button>
							<button type="button" id="resetBtn" class="btn btn-outline-secondary">초기화</button>
							<button type="button" id="closeBtn" class="btn btn-outline-secondary">닫기</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	<div class="modal fade" id="cpSearch" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="cpSearch" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="cpSearch">회사명 조회</h5>
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

