package bitcamp.java77.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java77.dao.GalleryDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Gallery;
import bitcamp.java77.domain.Team;
import bitcamp.java77.service.GalleryService;
import bitcamp.java77.util.MediaUtil;
import bitcamp.java77.util.UploadFileUtil;

@Controller("ajax.GalleryContorller")
@RequestMapping("/gallery/ajax/*")
public class GalleryController {
	
	private static final Logger logger = LoggerFactory.getLogger(GalleryController.class);
	
	@Autowired private GalleryDao galleryDao;
	@Autowired private GalleryService galleryService;
	@Autowired private ServletContext servletContext;
	@Autowired private AjaxResult ajaxResult;
	
	@RequestMapping("galleryList")
	public Object galleryList(int tno) throws Exception {
		
		List<Gallery> data = galleryDao.selectGalleryList(tno);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", data);
		
		return resultMap;
	}
	
	@RequestMapping("filterData")
	public Object filterData(int tno) throws Exception {
		List<Gallery> data = galleryDao.selectFilterData(tno);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", data);
		
		return resultMap;
	}
	
	@RequestMapping("galleryDetail")
	@ResponseBody
	public Object galleryDetail(Gallery gallery) throws Exception {
		Gallery data = galleryDao.selectGalleryDetail(gallery);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", data);
		
		return resultMap;
	}
	
	@RequestMapping("galleryInsert")
	public Object galleryInsert(Gallery gallery) throws Exception { 
		galleryService.galleryInsert(gallery);
				
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="galleryRegist", method=RequestMethod.POST, produces="text/plain; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<String> galleryRegist (MultipartFile file) throws Exception {
		logger.info("originalName : " + file.getOriginalFilename());
		String uploadPath = servletContext.getRealPath("/attachfile");
		
		return new ResponseEntity<>(UploadFileUtil.uploadFile(uploadPath, file.getOriginalFilename(), file.getBytes()), HttpStatus.CREATED);
	}
	
	@RequestMapping("displayFile")
	@ResponseBody
	public ResponseEntity<byte[]> displayFile(String fileName) throws Exception {
		logger.info("FILE NAME : " + fileName);
		InputStream in = null;
		ResponseEntity<byte[]> entity = null;
		String uploadPath = servletContext.getRealPath("/attachfile/");
		
		try {			
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
			MediaType mType = MediaUtil.getMediaType(formatName);
			HttpHeaders headers = new HttpHeaders();
			in = new FileInputStream(uploadPath + fileName);
			if(mType != null) {
				headers.setContentType(mType);
			} else {
				fileName = fileName.substring(fileName.indexOf("_") + 1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition", "attachment; filename=\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1")+"\"");
			}
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in),headers,HttpStatus.CREATED);
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			in.close();
		}
		return entity;
	}
	
	@RequestMapping("galleryUpdate")
	public Object galleryUpdate(Gallery gallery) throws Exception {
		galleryService.galleryUpdate(gallery);
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping("deleteGalleryFile")
	public Object deleteGalleryFile(Gallery gallery) throws Exception {
		galleryService.deleteGalleryFile(gallery);
		deleteFile(gallery.getFileName());
		return ajaxResult.setStatus("success");
	}
	
	@RequestMapping(value="deleteAllFiles", method=RequestMethod.POST)
	@ResponseBody
	public Object deleteAllFiles(@RequestParam("files[]") String[] files) throws Exception {
		logger.info("delete all files : " + files);
		String uploadPath = servletContext.getRealPath("/attachfile/");
		if(files == null || files.length == 0) {
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		}
		
		for(String fileName : files) {
			String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
			MediaType mType = MediaUtil.getMediaType(formatName);
			if(mType != null) {
				String front = fileName.substring(0, 12);
				String end = fileName.substring(14);
				String md = "md_";
				new File(uploadPath + (front + end).replace('/', File.separatorChar)).delete();
				new File(uploadPath + (front + md + end).replace('/', File.separatorChar)).delete();
			}
			new File(uploadPath + fileName.replace('/', File.separatorChar)).delete();
		}
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", null);
		return resultMap;
	}
	
	@RequestMapping(value="deleteFile", method=RequestMethod.POST)
	@ResponseBody
	public Object deleteFile(String fileName) throws Exception {
		logger.info("delete file : " + fileName);
		String uploadPath = servletContext.getRealPath("/attachfile/");
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
		MediaType mType = MediaUtil.getMediaType(formatName);
		if(mType != null) {
			String front = fileName.substring(0, 12);
			String end = fileName.substring(14);
			String md = "md_";
			
			new File(uploadPath + (front + end).replace('/', File.separatorChar)).delete();
			new File(uploadPath + (front + md + end).replace('/', File.separatorChar)).delete();
		}		
		new File(uploadPath + fileName.replace('/', File.separatorChar)).delete();
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", null);
		return resultMap;
	}
	
	@RequestMapping("teamInfo")
	@ResponseBody
	public Object teamInfo(int tno) throws Exception {
		Team team = galleryDao.selectTeamInfo(tno);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", team);
		return resultMap;
	}
	
	@RequestMapping("teamInfoList")
	@ResponseBody
	public Object teamInfoList(int tno) throws Exception {
		List<Team> teamInfoList = galleryDao.selectTeamInfoList(tno);
		
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", teamInfoList);
		return resultMap;
	}
}