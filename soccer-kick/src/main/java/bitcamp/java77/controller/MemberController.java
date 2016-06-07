package bitcamp.java77.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Member;
import bitcamp.java77.service.MemberService;
import bitcamp.java77.util.MultipartHelper;

@Controller("MemberController")
@RequestMapping("/member/*")
public class MemberController {
	private static final String SAVED_DIR = "/attachfile";
	private static final Logger logger = 
			LoggerFactory.getLogger(MemberController.class);
	
	@Autowired private AjaxResult ajaxResult;
	@Autowired private MemberService memberService;
	@Autowired private ServletContext servletContext;
	
	@RequestMapping(value="list", method=RequestMethod.GET)
	public Object list(int tno) {
		return ajaxResult.setStatus("success")
				.setData(memberService.list(tno));
	}
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	public Object add(Member member) {
		logger.info("Member Regist Controller Execute");
		try {
			memberService.insert(member);		
		} catch(Exception e) {
			e.printStackTrace();
			logger.error("Member Add Error", e);
			return ajaxResult.setStatus("fail");
		}
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="updatePhoto", method=RequestMethod.POST)
	public Object updatePhoto(Member member, HttpSession session,
			@RequestParam("profilePhoto") MultipartFile[] files) {
		logger.info("Member Photo Update Controller Execute");
		String mpath = "";
		try {
			String saveDir = servletContext.getRealPath(SAVED_DIR);
			SimpleDateFormat dateFormat = new SimpleDateFormat("/yyyy/MM/dd");
			saveDir += dateFormat.format(new Date());
			File saveFolder = new File(saveDir);
			saveFolder.mkdirs();
			
			mpath = "/soccer-kick" + SAVED_DIR + dateFormat.format(new Date());
			for(MultipartFile file : files) {
				if(file.getSize() > 0) {
					String newFileName = 
							MultipartHelper.generateFilename(file.getOriginalFilename());
					String filePath = "";
					mpath += "/" + newFileName;
					filePath = saveDir + "/" + newFileName;
					File attachfile = new File(filePath);
					file.transferTo(attachfile);
				}
			}
			memberService.updatePhoto(member.setMpath(mpath));
			member = (Member)session.getAttribute("loginUser");
			member.setMpath(mpath);
			session.setAttribute("loginUser", member);
		} catch(Exception e) {
			logger.error("error : member photo update", e);
			return ajaxResult.setStatus("fail");
		}
		
		logger.info("Update Success");
		return ajaxResult.setStatus("success")
						 .setData(mpath);
	}
	
	@RequestMapping(value="updateProfile", method=RequestMethod.POST)
	public Object updateProfile(Member member, HttpSession session) {
		logger.info("update member profile");
		memberService.updateProfile(member);
		Member loginUser = (Member)session.getAttribute("loginUser");
		session.setAttribute("loginUser", loginUser.setMpno(member.getMpno())
										 .setMbaseAddr(member.getMbaseAddr())
										 .setMdetAddr(member.getMdetAddr())
										 .setMposname(member.getMposname()));
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="updateApply", method=RequestMethod.POST)
	public Object updateApplyTno(Member member, HttpSession session) {
		logger.info("update member apply team number");
		memberService.updateApplyTno(member);
		Member loginUser = (Member)session.getAttribute("loginUser");
		session.setAttribute("loginUser", loginUser.setMapplyTno(member.getMapplyTno())
										  		   .setMapplyYN("Y"));
		return ajaxResult.setStatus("success");
	}
}
