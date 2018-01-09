package bitcamp.java77.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.mysql.jdbc.StringUtils;

import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Board;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Fileattach;
import bitcamp.java77.domain.Member;
import bitcamp.java77.service.BoardService;
import bitcamp.java77.service.CommentService;

@Controller("BoardController")
@RequestMapping("/board/*")
public class BoardController {
	private static int HOWMANY_PER_PAGE;
	private static final String SAVED_DIR = "/attachfile";
	private static final Logger logger = 
			LoggerFactory.getLogger(BoardController.class);
	
	@Autowired private Fileattach fileattach;
	@Autowired private AjaxResult ajaxResult;
	@Autowired private BoardService boardService;
	@Autowired private CommentService commentService;
	@Autowired private ServletContext servletContext;
	
	@RequestMapping(value="list", method=RequestMethod.GET)
	public Object list(BoardDto boardDto) {
		logger.info("Execute Getlist");
		
		String btype = boardDto.getBtype();
		if("S".equals(btype)) {
			HOWMANY_PER_PAGE = 5;
		} else if("B".equals(btype)) {
			HOWMANY_PER_PAGE = 15;
		}
		
		int pno = boardDto.getPno();
		if(boardDto.getKeyword() == null) { 
			boardDto.setKeyword("none")
					.setCategory("none");
		} else {
			String keyword = boardDto.getKeyword();
			boardDto.setKeyword("%" + keyword + "%");
		}
		Map<String, Object> resultMap = 
				boardService.list(boardDto.setHowmany(HOWMANY_PER_PAGE)
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
	
	@RequestMapping(value="add", method=RequestMethod.POST)
	public Object add(
			@RequestParam(value="screenShotImages", required=false, defaultValue="") 
			String screenShotImages, Board board) {
		logger.info("Execute Regist Board");
		int bno = boardService.insert(board);
		if("S".equals(board.getBtype())) {
			if(strategyImagesUploader(screenShotImages, bno)) {
				ajaxResult.setStatus("success");
			} else {
				ajaxResult.setStatus("fail");
			}
		}
		return ajaxResult;
	}
	
	@RequestMapping(value="detail", method=RequestMethod.GET)
	public Object detail(BoardDto boardDto, HttpServletRequest request, 
			HttpServletResponse response) {
		logger.info("check view cookies and update view count");
		Cookie[] cookies = request.getCookies();
		Map<String, String> cookieMap = new HashMap<>();
		if(request.getCookies() != null) {
			for(int i = 0; i < cookies.length; i++) {
				Cookie cookie = cookies[i];
				cookieMap.put(cookie.getName(), cookie.getValue());
			}
		}
		String readCnt = cookieMap.get("readCnt");
		int bno = boardDto.getBno();
		String newReadCnt = "|" + bno;
		if(StringUtils.indexOfIgnoreCase(readCnt, newReadCnt) == -1) {
			Cookie cookie = new Cookie("readCnt", readCnt + newReadCnt);
			response.addCookie(cookie);
			boardService.updateViewCnt(bno);
		}
		
		logger.info("execute getdetail");
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("boardDetail", boardService.detail(boardDto));
		resultMap.put("files", boardService.fileList(boardDto));
		return resultMap;
	}
	
	@RequestMapping(value="update", method=RequestMethod.POST)
	public Object update(Board board) {
		logger.info("execute update board");
		boardService.update(board);
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="delete", method=RequestMethod.GET)
	public Object delete(int bno, String memail, 
			HttpServletRequest request) {
		logger.info("execute delete board");
		if(!memail.equals(((Member)request.getSession()
				.getAttribute("loginUser")).getMemail())) {
			ajaxResult.setStatus("fail");
		} else {
			commentService.deleteByBoardNo(bno);
			boardService.deleteFileattach(bno);
			boardService.delete(bno);
			ajaxResult.setStatus("success");
		}
		return ajaxResult;
	}
	
	@RequestMapping(value="down", method=RequestMethod.GET)
	public void downLoader(HttpServletRequest req, HttpServletResponse res) {
		logger.info("execute file download");
		
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			String foriName = req.getParameter("foriName");
			String frealName = req.getParameter("frealName");
			String fpath = req.getParameter("fpath");
			int a = fpath.length();
			int b = frealName.length();
			int c = a - b;
			String d = fpath.substring(0, c);
			File f = new File(d, frealName);
			
			res.setHeader("Content-Type", "application/octet-stream");
			res.setHeader("Content-Disposition", "attachment;filename="+ new String(foriName.getBytes("UTF-8"),"8859_1"));
			res.setHeader("Content-Transfer-Encoding", "binary;");
			res.setHeader("Content-Length", String.valueOf(f.length()));
			res.setHeader("Pragma", "no-cache;");
			res.setHeader("Expires", "-1;");
			
			if(f.isFile()){ 
				bis = new BufferedInputStream(new FileInputStream(f));
				bos = new BufferedOutputStream(res.getOutputStream());
				
				while(true){
					int ch = bis.read();
					if(ch == -1) break;
					bos.write(ch);
				}
			}
		} catch (Exception e) {
			logger.error("error : file download", e);
		} finally {
			if(bos != null) try {bos.close();} catch(Exception e) {}
			if(bis != null) try {bis.close();} catch(Exception e) {}
		}
	}
	
	private boolean strategyImagesUploader(String screenShotImages, int bno) {
		logger.info("Execute ImagesUpload");
		ByteArrayInputStream bais = null;
		FileOutputStream fos = null;
		BufferedOutputStream bos = null;
		
		try {
			String[] imgsUrl = screenShotImages.split("\\?");
			String saveDir = servletContext.getRealPath(SAVED_DIR);
			System.out.println(saveDir);
			SimpleDateFormat dateFormat = new SimpleDateFormat("/yyyy/MM/dd");
			String dateFormatStr = dateFormat.format(new Date());
			saveDir += dateFormatStr;
			File saveFolder = new File(saveDir);
			saveFolder.mkdirs();
			String filePath = "/soccer-kick" + SAVED_DIR + dateFormatStr; 
			
			for(String imgUrl : imgsUrl) {
				if("".equals(imgUrl)) continue;
				String fileName = UUID.randomUUID().toString() + ".png";
				File uploadImageFile = new File(saveDir + "/" + fileName);
				uploadImageFile.createNewFile();
				
				String trimmedData = imgUrl.replace("data:image/png;base64,","");
				byte[] uploadedImage = Base64.decodeBase64(trimmedData);
				
				bais = new ByteArrayInputStream(uploadedImage);
				fos = new FileOutputStream(uploadImageFile);
				bos = new BufferedOutputStream(fos);
				
				int su = 0;
				byte b[] = new byte[1024];
				while((su = bais.read(b)) != -1) {
					fos.write(b, 0, su);
				}
				
				boardService.insertFile(fileattach.setBno(bno)
										.setFpath(filePath + "/" + fileName));
			}
			return true;
		} catch(Exception e) {
			logger.error("error image upload", e);
			return false;
		} finally {
			try { bos.close(); } catch(Exception e) {}
			try { fos.close(); } catch(Exception e) {}
		}
	}
}