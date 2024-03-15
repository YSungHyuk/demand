package net.smarthaccp.demand.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "main";
	}
	
	@RequestMapping(value="/close", method = RequestMethod.GET)
	public String close() {
		return "close";
	}
	
	@RequestMapping(value="/requirements")
	public String requirements() {
		return "requirements/main";
	}
	
	@RequestMapping(value="/managements")
	public String siteManagements() {
		return "managements/main";
	}
	
}
