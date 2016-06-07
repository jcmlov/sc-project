package bitcamp.java77.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import bitcamp.java77.domain.Member;

public class LoginInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = 
			LoggerFactory.getLogger(LoginInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, 
			HttpServletResponse response, Object handler)
			throws Exception {

		logger.info("Execute LoginInterceptor");
		Member loginUser = (Member) request.getSession()
										   .getAttribute("loginUser");
		
		String servletPath = request.getServletPath();
//		if (!servletPath.equals("/login/login.do") &&
//			!servletPath.equals("/member/add.do") && 
//			loginUser == null) {
//			logger.error("error : need login");
//			response.sendError(901);
//			return false; // 다음으로 가는 것을 멈춰라!
//		}
		return true; // 다음 인터셉터나 페이지 컨트롤러로 가라.
	}
}
