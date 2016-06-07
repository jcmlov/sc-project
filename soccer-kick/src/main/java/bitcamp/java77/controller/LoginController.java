package bitcamp.java77.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.LoginDto;
import bitcamp.java77.domain.Member;
import bitcamp.java77.service.MemberService;
import bitcamp.java77.service.TeamService;

@Controller("LoginController")
@RequestMapping("/login/*")
public class LoginController {
	private static final Logger logger = 
			LoggerFactory.getLogger(LoginController.class);
	
	@Autowired private AjaxResult ajaxResult;
	@Autowired private MemberService memberService;
	@Autowired private TeamService teamService;
	
	@RequestMapping(value="login", method=RequestMethod.POST)
	public Object login(LoginDto loginDto, String saveEmail, HttpServletResponse response,
			HttpSession session) {
		logger.info("execute login controller");
		Cookie emailCookie = null;
		if (saveEmail != null) { // 이메일 저장을 체크했으면,
			emailCookie = new Cookie("email", loginDto.getMemail());
			emailCookie.setMaxAge(60 * 60 * 24 * 15);
		} else {
			emailCookie = new Cookie("email", "");
			emailCookie.setMaxAge(0); // 웹브라우저에게 email 쿠키 삭제를 명령한다.
		}
		response.addCookie(emailCookie);

		Member loginUser = memberService.retrieve(loginDto);

		if (loginUser == null) { // 로그인 실패!
			session.invalidate(); // 세션을 무효화시킴. => 새로 세션 객체 생성!
			ajaxResult.setStatus("fail");
		} else {
			session.setAttribute("loginUser", loginUser);
			Map<String, Object> map = new HashMap<>();
			map.put("user", loginUser);
			map.put("userTeamInfo", teamService.select(loginUser.getTno()));
			ajaxResult.setStatus("success").setData(map);
		}
		return ajaxResult;
	}

	@RequestMapping(value="logout", method=RequestMethod.GET)
	public Object logout(HttpSession session) {
		logger.info("execute logout controller");
		session.invalidate();
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="getUserInfo", method=RequestMethod.GET)
	public Object getUserInfo(HttpSession session) {
		Member member = (Member)session.getAttribute("loginUser");
		Map<String, Object> map = new HashMap<>();
		map.put("user", member);
		map.put("userTeamInfo", teamService.select(member.getTno()));
		return ajaxResult.setStatus("success")
						 .setData(map);
	}
}
