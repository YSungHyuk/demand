<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>관리사이트 수정</title>
	<link rel="stylesheet" href="/resources/css/etc/file.css">
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<script src="${pageContext.request.contextPath }/resources/js/managements/site_update.js"></script>
	<form id="form">
		<input type="hidden" value="${site.site_idx }" name="site_idx">
		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6">
					<div class="row align-items-center">
						<label class="col-sm-2 col-form-label">사업단위</label>
						<div class="col-sm-10">
							<div class="input-group">
								<div class="form-check me-3">
									<input class="form-check-input" type="radio" name="business_level" id="level1" value="기초" <c:if test="${site.business_level eq '기초' }">checked</c:if>>
									<label class="form-check-label" for="level1">기초</label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="business_level" id="level2" value="고도화" <c:if test="${site.business_level eq '고도화' }">checked</c:if>>
									<label class="form-check-label" for="level2">고도화</label>
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_name">회사명</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_name" id="site_name" required value="${site.site_name }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_ceo">대표이사</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_ceo" id="site_ceo" required value="${site.site_ceo }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="business_start_date">사업시작</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="business_start_date" id="business_start_date" required readonly value="${site.business_start_date }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="business_end_date">사업종료</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="business_end_date" id="business_end_date" required readonly value="${site.business_end_date }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_url">URL</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_url" id="site_url" required value="${site.site_url }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="site_port">접속포트</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="site_port" id="site_port" required value="${site.site_port }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="db_type">DB종류</label>
						<div class="col-sm-6">
							<select class="form-select" aria-label="Default select example" name="db_type" id="db_type">
								<option value="MariaDB" <c:if test="${site.db_type eq 'MariaDB' }">selected</c:if>>MariaDB</option>
								<option value="MySQL" <c:if test="${site.db_type eq 'MySQL' }">selected</c:if>>MySQL</option>
								<option value="ORACLE" <c:if test="${site.db_type eq 'ORACLE' }">selected</c:if>>ORACLE</option>
							</select>
						</div>
						<div class="col-sm-4">
							<input type="text" autocomplete="off" class="form-control" name="db_port" id="db_port" placeholder="접속포트" value="${site.db_port }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="db_name">DB명</label>
						<div class="col-sm-10">
							<input type="text" autocomplete="off" class="form-control" name="db_name" id="db_name" value="${site.db_name }">
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-sm-2 col-form-label">계정정보</div>
						<div class="col-sm-5">
							<input type="text" autocomplete="off" class="form-control" name="db_id" id="db_id" placeholder="아이디" value="${site.db_id }">
						</div>
						<div class="col-sm-5">
							<input type="password" autocomplete="off" class="form-control" name="db_pw" id="db_pw" placeholder="비밀번호" value="${site.db_pw }">
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
						<c:if test="${site.file_idx ne null }">
							<input type="hidden" value="${site.file_idx }" name="file_idx">
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
											<span class="size">
												<script>
													document.write(sizeFormat(${file.file_size}));
												</script>
											</span>
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

