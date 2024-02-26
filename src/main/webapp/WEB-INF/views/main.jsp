<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>DEMAND</title>
	<link rel="stylesheet" href="resources/css/dist/tui-pagination.css">
	<link rel="stylesheet" href="resources/css/dist/tui-grid.css">
	<link rel="stylesheet" href="resources/css/dist/toastui-chart.min.css">
	<link rel="stylesheet" href="resources/css/dist/toastr.css">
<!-- 	<link rel="stylesheet" href="resources/css/dist/bootstrap_4.5.2.min.css"> -->
	<link rel="stylesheet" href="resources/css/dist/bootstrap.css">
	<link rel="stylesheet" href="resources/css/dist/bootstrap-datepicker.min.css">
<!-- 	<link rel="stylesheet" href="resources/css/main.css"> -->
	
	<script src="resources/js/dist/jquery-3.7.0.js"></script>
	<script src="resources/js/dist/tui-pagination.js"></script>
	<script src="resources/js/dist/tui-grid.js"></script>
	<script src="resources/js/dist/toastui-chart.min.js"></script>
	<script src="resources/js/dist/toastr.min.js"></script>
<!-- 	<script src="resources/js/dist/bootstrap_4.5.2.min.js"></script> -->
	<script src="resources/js/dist/bootstrap.js"></script>
	<script src="resources/js/dist/popper.min.js"></script>
	<script src="resources/js/dist/bootstrap-datepicker.min.js"></script>
	<script src="resources/js/dist/bootstrap-datepicker.ko.min.js"></script>
	<script src="resources/js/main.js"></script>
</head>
<body>
	<div class="page-wrapper">
		<section class="intro">
			<header role="banner">
				<span class="title">메인화면</span>
				<h2></h2>
			</header>
		</section>
		<div class="main supporting" role="main">
			<div class="main" role="article">
				메인화면
			</div>
			<div class="requirements" role="article">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">
							    <div class="flex-row d-flex justify-content-between">
									<div class="col-lg-6 col-11 px-1">
										<div class="input-group">
											<label for="StartDate">
												<input type='text' id='StartDate' class='form-control text-left mr-2' readonly="readonly" placeholder='시작일'>
											</label>
											<label for="EndDate"> 
												<input type='text' id='EndDate' class='form-control text-left ml-2' readonly="readonly" placeholder='종료일'>
											</label>
										</div>
									</div>
									<div class="col-lg-6 col-11 px-1">
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
						<div class="row">
							<div class="col-sm-2"></div>
							<div class="col-sm-8 text-center">
								<div class="input-group mb-3">
									<select id="search_type" class="form-select">
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
							<div class="col-sm-2">
								<button id="inser_item" class="btn btn-info">
									등록
								</button>
							</div>
						</div>
						<div class="row justify-content-center">
							<div id="pageList" class="col-md-6 dffset-md-3 text-center"></div>
						</div>
					</div>
			</div>
			<div class="managementSite" role="article">
				관리페이지
			</div>
		</div>
		<aside class="sidebar" role="complementary">
			<div class="wrapper">
				<div class="design-selection" id="design-selection">
					<h3 class="select">Select a Design:</h3>
					<nav role="navigation">
						<ul>
							<li>
								<a href="/" class="design-name" id="main">메인화면</a>					
								<a href="#" class="design-name" id="requirements">요구사항</a>					
								<a href="#" class="design-name" id="managementSite">관리사이트</a>					
							</li>					
						</ul>
					</nav>
				</div>
			</div>
		</aside>
	</div>
</body>
</html>
