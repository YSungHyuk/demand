<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<nav class="navbar navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="${pageContext.request.contextPath }/">
<%-- 				<img src="logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top"> --%>
			로고박스
		</a>
	</div>
	<ul class="nav justify-content-center">
		<li class="nav-item">
			<a class="nav-link" href="/">메인화면</a>
		</li>
		<li class="nav-item">
		  	<a class="nav-link" href="/requirements">요구사항</a>
		</li>
		<li class="nav-item">
		  	<a class="nav-link" href="/managements">관리사이트</a>
		</li>
	</ul>
</nav>
