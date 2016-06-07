package bitcamp.java77.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Member;
import bitcamp.java77.service.CommentService;

@Controller("CommentController")
@RequestMapping("/comment/*")
public class CommentController {
	private static final int HOWMANY_PER_PAGE = 5;
	private static final Logger logger = 
			LoggerFactory.getLogger(CommentController.class);
	
	@Autowired private AjaxResult ajaxResult;
	@Autowired private CommentService commentService;
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	public Object add(Comment comment) {
		logger.info("execute comment add");
		commentService.insert(comment);
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="list", method=RequestMethod.GET)
	public Object list(BoardDto boardDto) {
		logger.info("execute get comment list");
		int pno = boardDto.getPno();
		Map<String, Object> resultMap = 
				commentService.list(boardDto.setHowmany(HOWMANY_PER_PAGE)
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
	
	@RequestMapping(value="update", method=RequestMethod.POST)
	public Object update(String memail, Comment comment,
			HttpServletRequest request) {
		if(!memail.equals(((Member)request.getSession()
				.getAttribute("loginUser")).getMemail())) {
			ajaxResult.setStatus("fail");
		} else {
			commentService.update(comment);
			ajaxResult.setStatus("success");
		}
		return ajaxResult;
	}
	
	@RequestMapping(value="delete", method=RequestMethod.GET)
	public Object delete(String memail, int cno, 
			HttpServletRequest request) {
		logger.info("execute comment delete");
		if(!memail.equals(((Member)request.getSession()
							.getAttribute("loginUser")).getMemail())) {
			ajaxResult.setStatus("fail");
		} else {
			commentService.delete(cno);
			ajaxResult.setStatus("success");
		}
		return ajaxResult;
	}
}
