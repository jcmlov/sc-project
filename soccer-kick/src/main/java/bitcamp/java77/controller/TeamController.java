package bitcamp.java77.controller;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import bitcamp.java77.dao.TeamDao;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;
import bitcamp.java77.domain.TeamDto;
import bitcamp.java77.service.TeamService;

@Controller("TeamController")
@RequestMapping("/team/*")
public class TeamController {
	private static final int HOWMANY_PER_PAGE = 4;
	private static final Logger logger = 
			LoggerFactory.getLogger(TeamController.class);
	@Autowired private TeamService teamService;
	@Autowired private TeamDao teamDao;
	
	@SuppressWarnings("deprecation")
	@RequestMapping(value="list", method=RequestMethod.GET)
	public Object list(TeamDto teamDto, HttpServletRequest request) {
		logger.info("execute get team list controller");
		int pno = teamDto.getPno();
		String keyword = URLDecoder.decode(request.getParameter("keyword"));
		if(!"none".equals(keyword)) {
			teamDto.setKeyword("%" + URLDecoder.decode(request.getParameter("keyword")) + "%");			
		}
		teamDto.setDistrict("%" + URLDecoder.decode(request.getParameter("district")) + "%");
		Map<String, Object> resultMap = 
				teamService.list(teamDto.setHowmany(HOWMANY_PER_PAGE)
								.setStart((pno - 1) * HOWMANY_PER_PAGE));
		
		int cnt = (Integer)resultMap.get("cnt");
		int lastPage = (cnt % HOWMANY_PER_PAGE == 0) ? 
					    cnt / HOWMANY_PER_PAGE : 
					    cnt / HOWMANY_PER_PAGE + 1;
		int currTab = (pno - 1) / HOWMANY_PER_PAGE + 1;
		int beginPage = (currTab - 1) * HOWMANY_PER_PAGE + 1;
		int endPage = (currTab * HOWMANY_PER_PAGE > lastPage) ? 
					   lastPage : currTab * HOWMANY_PER_PAGE;
		
		resultMap.put("lastPage", lastPage);
		resultMap.put("pno", pno);
		resultMap.put("beginPage", beginPage);
		resultMap.put("endPage", endPage);
		return resultMap;
	}
	
	@RequestMapping("registCreateTeam")
	@ResponseBody
	public Object createTeam(Team team, HttpSession session) throws Exception {

		teamService.createTeam(team, session);
		
		List<Team> data = teamDao.selectTeam();
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", data);
		return resultMap;
	}
	
	@RequestMapping("searchMembers")
	@ResponseBody
	public Object searchMembers(Member member) throws Exception {
		
		Member data = teamDao.searchMembers(member);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", data);
		
		return resultMap;
	}
}