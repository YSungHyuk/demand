<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>${title }</title>
	<style type="text/css">
		#form {
			min-width: 300px;
			min-height: 700px;
		}
	</style>
</head>
<body>
	<header>
		<jsp:include page="../inc/header.jsp" />
	</header>
	<c:choose>
		<c:when test="${type eq 'C' }">
			<script src="/resources/js/registRequest.js"></script>
		</c:when>
		<c:when test="${type eq 'U' }">
			<script src="/resources/js/updateRequest.js"></script>
		</c:when>
	</c:choose>
	<form id="form" method="POST" enctype="multipart/form-data">
		<c:if test="${type eq 'U' }">
			<input type="hidden" name="idx" value="${request.idx }">
		</c:if>						
		<div class="container">
			<div class="row">
				<div class="col">
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
					<div class="row">
						<div class="col">
							<div class="container" id="file-group">
							</div>
						</div>
					</div>
				</div>
				<c:if test="${type eq 'U' }">
					<div class="col">
						<div id="Carousel" class="carousel slide" data-bs-ride="carousel">
							<div class="carousel-indicators">
								<button type="button" data-bs-target="#Carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
							</div>
							<div class="carousel-inner">
							    	<c:forEach items="${request.files }" var="file" varStatus="status">
									    <div class="carousel-item <c:if test="${status.index eq 0 }">active</c:if>">
<%-- 								        	<img src="${pageContext.request.contextPath }/resources${file.file_path }/${file.file_name }" class="d-block w-100" alt="첨부이미지1"> --%>
								        	<img src="${pageContext.request.contextPath}/resources${file.file_path}/${file.file_name}" class="d-block w-100" alt="첨부이미지1">
								        	
									    </div>
							    	</c:forEach>
							</div>
							<button class="carousel-control-prev" type="button"
								data-bs-target="#Carousel" data-bs-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Previous</span>
							</button>
							<button class="carousel-control-next" type="button"
								data-bs-target="#Carousel" data-bs-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Next</span>
							</button>
						</div>
					</div>
				</c:if>
			</div>
			<div class="container">
				<div class="row text-center">
					<div class="col">
						<div class="btn-group" role="group">
							<c:choose>
								<c:when test="${type eq 'C'}">
									<button type="button" id="submitBtn" class="btn btn-outline-secondary">등록</button>
									<button type="button" id="resetBtn" class="btn btn-outline-secondary">초기화</button>
									<button type="button" id="closeBtn" class="btn btn-outline-secondary">닫기</button>
								</c:when>
								<c:when test="${type eq 'U'}">
									<button type="button" id="submitBtn" class="btn btn-outline-secondary">수정</button>
									<button type="button" id="closeBtn" class="btn btn-outline-secondary">닫기</button>
								</c:when>
							</c:choose>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>
