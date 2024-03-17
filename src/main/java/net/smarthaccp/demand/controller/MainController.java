package net.smarthaccp.demand.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "main";
	}
	
	@RequestMapping(value="/close", method = RequestMethod.GET)
	public String close() {
		return "etc/close";
	}
	
	@RequestMapping(value="/requirements")
	public String requirements() {
		return "requirements/request_main";
	}
	
	@RequestMapping(value="/managements")
	public String siteManagements() {
		return "managements/site_main";
	}
	
}
