<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<title>DEMAND</title>
	<link rel="stylesheet" href="resources/css/tui-pagination.css">
	<link rel="stylesheet" href="resources/css/tui-grid.css">
	<link rel="stylesheet" href="resources/css/toastui-chart.min.css">
	<link rel="stylesheet" href="resources/css/toastr.css">
	<link rel="stylesheet" href="resources/css/bootstrap_4.5.2.min.css">
	<link rel="stylesheet" href="resources/css/bootstrap-datepicker.min.css">
	<link rel="stylesheet" href="resources/css/main.css">
	
	<script src="resources/js/jquery-3.7.0.js"></script>
	<script src="resources/js/tui-pagination.js"></script>
	<script src="resources/js/tui-grid.js"></script>
	<script src="resources/js/toastui-chart.min.js"></script>
	<script src="resources/js/toastr.min.js"></script>
	<script src="resources/js/bootstrap_4.5.2.min.js"></script>
	<script src="resources/js/popper.min.js"></script>
	<script src="resources/js/bootstrap-datepicker.min.js"></script>
	<script src="resources/js/bootstrap-datepicker.ko.min.js"></script>
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
				요구사항
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
