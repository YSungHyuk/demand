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
</head>
<body>
<body>
	<div class="page-wrapper">
	
		<section class="intro">
			<header role="banner">
				<h1>h1 가상선택</h1>
				<h2>h2 가상선택</h2>
			</header>
			<%--요약 --%>
<!-- 			<div class="summary" role="article"> -->
<!-- 				<p>A demonstration of what can be accomplished through  -->
<!-- 					<abbr title="Cascading Style Sheets">CSS</abbr> -->
<!-- 					-based design. Select any style sheet from the list to load it into this page. -->
<!-- 				</p> -->
<!-- 				<p>Download the example  -->
<!-- 					<a href="/examples/index" title="This page's source HTML code, not to be modified.">html file</a> -->
<!-- 					<a href="/examples/style.css" title="This page's sample CSS, the file you may modify.">css file</a> -->
<!-- 				</p> -->
<!-- 			</div> -->
			<%-- 전문 --%>
<!-- 			<div class="preamble" role="article"> -->
<!-- 				<h3>The Road to Enlightenment</h3> -->
<!-- 				<p>Littering a dark and dreary road lay the past relics of browser-specific tags, incompatible <abbr title="Document Object Model">DOM</abbr>s, broken <abbr title="Cascading Style Sheets">CSS</abbr> support, and abandoned browsers.</p> -->
<!-- 				<p>We must clear the mind of the past. Web enlightenment has been achieved thanks to the tireless efforts of folk like the <abbr title="World Wide Web Consortium">W3C</abbr>, <abbr title="Web Standards Project">WaSP</abbr>, and the major browser creators.</p> -->
<!-- 				<p>The CSS Zen Garden invites you to relax and meditate on the important lessons of the masters. Begin to see with clarity. Learn to use the time-honored techniques in new and invigorating fashion. Become one with the web.</p> -->
<!-- 			</div> -->
		</section>
	
		<div class="main supporting" role="main">
<!-- 			<div class="explanation" role="article"> -->
<!-- 				<h3>So What is This About?</h3> -->
<!-- 				<p>There is a continuing need to show the power of  -->
<!-- 					<abbr title="Cascading Style Sheets">CSS</abbr> -->
<!-- 					. The Zen Garden aims to excite, inspire, and encourage participation. To begin, view some of the existing designs in the list. Clicking on any one will load the style sheet into this very page. The <abbr title="HyperText Markup Language">HTML</abbr> remains the same, the only thing that has changed is the external <abbr title="Cascading Style Sheets">CSS</abbr> file. Yes, really.</p> -->
<!-- 				<p><abbr title="Cascading Style Sheets">CSS</abbr> allows complete and total control over the style of a hypertext document. The only way this can be illustrated in a way that gets people excited is by demonstrating what it can truly be, once the reins are placed in the hands of those able to create beauty from structure. Designers and coders alike have contributed to the beauty of the web; we can always push it further.</p> -->
<!-- 			</div> -->
<!-- 			<div class="participation" role="article"> -->
<!-- 				<h3>Participation</h3> -->
<!-- 				<p>Strong visual design has always been our focus. You are modifying this page, so strong <abbr title="Cascading Style Sheets">CSS</abbr> skills are necessary too, but the example files are commented well enough that even <abbr title="Cascading Style Sheets">CSS</abbr> novices can use them as starting points. Please see the <a href="/pages/resources/" title="A listing of CSS-related resources"><abbr title="Cascading Style Sheets">CSS</abbr> Resource Guide</a> for advanced tutorials and tips on working with <abbr title="Cascading Style Sheets">CSS</abbr>.</p> -->
<!-- 				<p>You may modify the style sheet in any way you wish, but not the <abbr title="HyperText Markup Language">HTML</abbr>. This may seem daunting at first if you’ve never worked this way before, but follow the listed links to learn more, and use the sample files as a guide.</p> -->
<!-- 				<p>Download the sample <a href="/examples/index" title="This page's source HTML code, not to be modified.">HTML</a> and <a href="/examples/style.css" title="This page's sample CSS, the file you may modify.">CSS</a> to work on a copy locally. Once you have completed your masterpiece (and please, don’t submit half-finished work) upload your <abbr title="Cascading Style Sheets">CSS</abbr> file to a web server under your control. <a href="/pages/submit/" title="Use the contact form to send us your CSS file">Send us a link</a> to an archive of that file and all associated assets, and if we choose to use it we will download it and place it on our server.</p> -->
<!-- 			</div> -->
	
<!-- 			<div class="benefits" role="article"> -->
<!-- 				<h3>Benefits</h3> -->
<!-- 				<p>Why participate? For recognition, inspiration, and a resource we can all refer to showing people how amazing <abbr title="Cascading Style Sheets">CSS</abbr> really can be. This site serves as equal parts inspiration for those working on the web today, learning tool for those who will be tomorrow, and gallery of future techniques we can all look forward to.</p> -->
<!-- 			</div> -->
	
			<div class="requirements" role="article">
				<h3>Requirements</h3>
			</div>
<!-- 			<footer> -->
<!-- 				<a href="http://validator.w3.org/check/referer" title="Check the validity of this site’s HTML" class="zen-validate-html">HTML</a> -->
<!-- 				<a href="http://jigsaw.w3.org/css-validator/check/referer" title="Check the validity of this site’s CSS" class="zen-validate-css">CSS</a> -->
<!-- 				<a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="View the Creative Commons license of this site: Attribution-NonCommercial-ShareAlike." class="zen-license">CC</a> -->
<!-- 				<a href="http://mezzoblue.com/zengarden/faq/#aaa" title="Read about the accessibility of this site" class="zen-accessibility">A11y</a> -->
<!-- 				<a href="https://github.com/mezzoblue/csszengarden.com" title="Fork this site on Github" class="zen-github">GH</a> -->
<!-- 			</footer> -->
		</div>
		<aside class="sidebar" role="complementary">
			<div class="wrapper">
				<div class="design-selection" id="design-selection">
					<h3 class="select">Select a Design:</h3>
					<nav role="navigation">
						<ul>
							<li>
								<a href="#" class="design-name">메뉴명</a> <%-- 드롭다운 방식으로 변경할것 --%>					
								<a href="#" class="designer-name">세부항목</a>
							</li>					
						</ul>
					</nav>
				</div>
				<div class="design-archives" id="design-archives">
					<h3 class="archives">Archives:</h3>
					<nav role="navigation">
						<ul>
							<li class="next">
								<a href="#">이전</a>
							</li>
							<li class="viewall">
								<a href="#">전체</a>
							</li>
							<li class="previous">
								<a href="#">다음</a>
							</li>
						</ul>
					</nav>
				</div>
				<%-- 자료실 등을 구성할때 사용 --%>
<!-- 				<div class="zen-resources" id="zen-resources"> -->
<!-- 					<h3 class="resources">Resources:</h3> -->
<!-- 					<ul> -->
<!-- 						<li class="view-css"> -->
<!-- 							<a href="/220/220.css" title="View the source CSS file of the currently-viewed design."> -->
<!-- 								View This Design’s <abbr title="Cascading Style Sheets">CSS</abbr>						</a> -->
<!-- 						</li> -->
<!-- 						<li class="css-resources"> -->
<!-- 							<a href="/pages/resources/" title="Links to great sites with information on using CSS."> -->
<!-- 								<abbr title="Cascading Style Sheets">CSS</abbr> Resources						</a> -->
<!-- 						</li> -->
<!-- 						<li class="zen-faq"> -->
<!-- 							<a href="/pages/faq/" title="A list of Frequently Asked Questions about the Zen Garden."> -->
<!-- 								<abbr title="Frequently Asked Questions">FAQ</abbr>						</a> -->
<!-- 						</li> -->
<!-- 						<li class="zen-submit"> -->
<!-- 							<a href="/pages/submit/" title="Send in your own CSS file."> -->
<!-- 								Submit a Design						</a> -->
<!-- 						</li> -->
<!-- 						<li class="zen-translations"> -->
<!-- 							<a href="/pages/translations/" title="View translated versions of this page."> -->
<!-- 								Translations						</a> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
			</div>
		</aside>
	</div>
	<!--
	
		These superfluous divs/spans were originally provided as catch-alls to add extra imagery.
		These days we have full ::before and ::after support, favour using those instead.
		These only remain for historical design compatibility. They might go away one day.
			
	-->
	</body>
</body>
</html>
