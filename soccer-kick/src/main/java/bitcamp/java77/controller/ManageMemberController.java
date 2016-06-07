package bitcamp.java77.controller;

import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;
import bitcamp.java77.service.ManageMemberService;
import bitcamp.java77.service.TeamService;

@Controller("ManageMemberController")
@RequestMapping("/manageMember/*")
public class ManageMemberController {
	private static final Logger logger = LoggerFactory.getLogger(ManageMemberController.class);

	@Autowired
	private ManageMemberService manageMemberService;
	@Autowired
	private TeamService teamService;

	@RequestMapping(value = "teamMember", method = RequestMethod.GET)
	public AjaxResult list(Member member) {
		List<Member> members = null;
		List<Member> applyMembers = null;
		Map<String, Object> memberMap = new HashMap<>();
		try {
			members = manageMemberService.selectTeamMemberList(member);
			applyMembers = manageMemberService.selectTeamApplyList(member);
			memberMap.put("members", members);
			memberMap.put("location", teamService.select(member.getTno()));
			memberMap.put("applyMembers", applyMembers);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("ManageMember search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", memberMap);
	}

	@RequestMapping(value = "teamMemberDetail", method = RequestMethod.GET)
	public AjaxResult memberDetail(Member member) {
		Member memberDetail = null;
		try {
			memberDetail = manageMemberService.selectTeamMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", memberDetail);
	}

	@RequestMapping(value = "updateApply", method = RequestMethod.POST)
	public AjaxResult memberApply(Member member) {
		Team team = new Team();
		try {
			manageMemberService.updateApply(member);
			int tno = member.getTno();
			team.setTno(tno);
			manageMemberService.updateTmemCnt(team);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", "성공");
	}

	@RequestMapping(value = "updateTeamPosition", method = RequestMethod.POST)
	public AjaxResult teamPosition(Member member) {
		try {
			manageMemberService.updateTeamPosition(member);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", "성공");
	}

	@RequestMapping(value = "updateMemberPoint", method = RequestMethod.POST)
	public AjaxResult memberPoint(Member member) {
		try {
			manageMemberService.updateMemberPoint(member);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", "성공");
	}
	
	@RequestMapping(value = "updateLocation", method = RequestMethod.POST)
	public AjaxResult teamLocation(Team location) {
		Map<String, Object> model = null;
		try {
			String address = location.getTpoint().replace(" ", "%20");
			String blogAddr = "https://apis.daum.net/local/geo/addr2coord?apikey=ef3f72b10f924dd622d250e332052626&q="+ address +"&output=xml";
			URL url = new URL(blogAddr);

			InputStream is = url.openStream();
			Scanner in = new Scanner(is);
			String[] xmlData = new String[2];
			int count = 0;
			while (in.hasNextLine()) {
				String line = in.nextLine();
				count++;
				if (count == 27) {
					xmlData[0] = line.trim();
				}
				if (count == 28) {
					xmlData[1] = line.trim();
				}
			}
			xmlData[0] = xmlData[0].split("\\[CDATA\\[")[1].split("\\]\\]")[0];
			xmlData[1] = xmlData[1].split("\\[CDATA\\[")[1].split("\\]\\]")[0];
			
			List<Team> teamInfo = manageMemberService.teamInfo();
				
			model = new HashMap<>();
			model.put("teamInfo", teamInfo);
			model.put("lng", Double.parseDouble(xmlData[0]));
			model.put("lat", Double.parseDouble(xmlData[1]));
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", model);
	}
	
	@RequestMapping(value = "updateTeamLocation", method = RequestMethod.POST)
	public AjaxResult updateLocation(Team team) {
		try {
			team.setTpoint(team.getTpoint().split(" ")[0]);
			manageMemberService.updateLocation(team);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", "성공");
	}
	
	@RequestMapping(value = "updateExpulsion", method = RequestMethod.POST)
	public AjaxResult updateExpulsion(Member member, Team team) {
		try {
			manageMemberService.updateExpulsion(member);
			manageMemberService.updateExTmemCnt(team);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("MemberDetail search Error", e);
			return new AjaxResult("fail", null);
		}
		return new AjaxResult("success", "성공");
	}
}