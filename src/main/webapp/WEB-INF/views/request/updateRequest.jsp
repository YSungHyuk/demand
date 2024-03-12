<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<html>
<head>
	<title>요구사항 수정</title>
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
<!-- 	<div> -->
<%-- 	${request } --%>
<!-- 	</div> -->
<!-- 	<div> -->
<%-- 	${files } --%>
<!-- 	</div> -->
	<script src="/resources/js/updateRequest.js"></script>
	<form id="form" method="POST" enctype="multipart/form-data">
		<div class="container">
			<div class="row">
				<div class="col-12 <c:if test="${fn:length(files) > 0}">col-lg-6 </c:if>">
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
						<div class="col-sm-10">
							<input type="text" class="form-control" name="company" id="company" required value="${request.company }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="requester">요청자</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="requester" id="requester" required value="${request.requester }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="request_date">요청일</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="request_date" id="request_date" required value="${request.request_date }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="title">제목</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="title" id="title" required value="${request.title }">
						</div>
					</div>
					<div class="row mb-3">
						<label class="col-sm-2 col-form-label" for="content">내용</label>
						<div class="col-sm-10">
							<textarea class="form-control" name="content" id="content" rows="5" required>${request.content }</textarea>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="container" id="file-group">
								<c:forEach items="${files }" var="file" varStatus="status">
<%-- 									${file } --%>
									<div class='row mb-3'>
										<div class='col input-group'>
											<a href="javascript:window.open('${pageContext.request.contextPath}${file.file_path}/${file.uuid}_${file.file_name}','_self')">
												<input class='form-control' value="${file.file_name }" readonly>
											</a>
											<button class='delBtn btn btn-outline-secondary' type='button'>삭제</button>
										</div>
									</div>
								</c:forEach>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row text-center">
					<div class="col">
						<div class="btn-group" role="group">
							<button type="button" id="submitBtn" class="btn btn-outline-secondary">수정</button>
							<button type="button" id="closeBtn" class="btn btn-outline-secondary">닫기</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>
