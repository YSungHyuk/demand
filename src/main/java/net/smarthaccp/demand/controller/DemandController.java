package net.smarthaccp.demand.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.smarthaccp.demand.services.LpServices;

@Controller
public class DemandController {
	
	private static final Logger logger = LoggerFactory.getLogger(DemandController.class);
	
	@Autowired
	private LpServices lpServices;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) throws Exception {
		model.addAttribute("result", "test");
		return "main";
	}
}
