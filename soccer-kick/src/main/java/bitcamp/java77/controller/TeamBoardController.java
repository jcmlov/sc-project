package bitcamp.java77.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java77.dao.BoardDao;
import bitcamp.java77.dao.TeamBoardDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Fileattach;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.TeamBoard;
import bitcamp.java77.service.TeamBoardService;
import bitcamp.java77.util.MultipartHelper;

@Controller
@RequestMapping("/TeamBoard/ajax/*")
public class TeamBoardController {
	
	private static int HOWMANY_PER_PAGE;
	private static final String SAVED_DIR = "/attachfile";
	private static final Logger logger = 
					LoggerFactory.getLogger(TeamBoardController.class);

	@Autowired TeamBoardDao boardDao;
	@Autowired BoardDao boardDaos;
	@Autowired TeamBoardService boardService;
	@Autowired private Fileattach fileattach;
	@Autowired private AjaxResult ajaxResult;
	@Autowired private ServletContext servletContext;
	
	@RequestMapping(value = "teamBoardList")
	@ResponseBody
	public Object teamBoardList(BoardDto boardDto) throws Exception {
		logger.info("Execute Getlist");
		
		String btype = boardDto.getBtype();
		HOWMANY_PER_PAGE = 15;
		
		int pno = boardDto.getPno();
		if(boardDto.getKeyword() == null) { 
			boardDto.setKeyword("none")
					.setCategory("none");
		} else {
			String keyword = boardDto.getKeyword();
			boardDto.setKeyword("%" + keyword + "%");
		}
		Map<String, Object> resultMap = 
				boardService.teamBoardList(boardDto.setHowmany(HOWMANY_PER_PAGE)
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
	
	@RequestMapping(value = "list")
	@ResponseBody
	public Object list() throws Exception {
		return ajaxResult.setStatus("success")
				.setData(boardDao.selectList());
	}

	@RequestMapping(value = "detail")
	public Object searchOne(int bno) throws Exception {
		return ajaxResult.setStatus("success")
				.setData(boardDao.selectOne(bno));
	}
	
	@RequestMapping("userSelect")
	@ResponseBody
	public AjaxResult userSelect(int mno) throws Exception {
		return ajaxResult.setStatus("success")
			.setData(boardDao.userSelect(mno));
	}
	
	@RequestMapping(value="commentSelectOne", method=RequestMethod.GET)
	@ResponseBody
	public AjaxResult commentSelectOne(int cno) throws Exception {
		return ajaxResult.setStatus("success")
			.setData(boardDao.commentSelectOne(cno));
	}
	
	@RequestMapping(value = "insert")
	public Object regist(TeamBoard board) throws Exception {
		int boardNo= boardService.regist(board);
		return ajaxResult.setStatus("success")
				.setData(boardService.selectOne(boardNo));
	}

	@RequestMapping(value="update")
	@ResponseBody
	public Object update(TeamBoard board) throws Exception {
		boardService.update(board);
		return ajaxResult.setStatus("success")
						 .setData(board);
	}

	@RequestMapping(value="fileRegist", method=RequestMethod.POST, produces="text/plain; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<String> fileRegist(MultipartFile file) throws Exception {
		String saveDir = servletContext.getRealPath(SAVED_DIR);
		SimpleDateFormat dateFormat = new SimpleDateFormat("/yyyy/MM/dd");
		String dateFormatStr = dateFormat.format(new Date());
		saveDir += dateFormatStr;
		File saveFolder = new File(saveDir);
		saveFolder.mkdirs();
		
		String frealName = "";
		String foriName = "";
		if(file.getSize() > 0) {
			foriName = file.getOriginalFilename();
			frealName = MultipartHelper.generateFilename(foriName);
			File attachfile = new File(saveDir + "/" + frealName);
			file.transferTo(attachfile);
		}
		return new ResponseEntity<>((saveDir + "/" + frealName + "_ori_" + foriName), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "delete")
	@ResponseBody
	public Object delete(int bno) throws Exception {
		boardService.delete(bno);
		return ajaxResult.setStatus("success");
	}
}
