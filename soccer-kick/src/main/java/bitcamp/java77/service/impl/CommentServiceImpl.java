package bitcamp.java77.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.CommentDao;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired private CommentDao commentDao;
	
	@Override
	public void insert(Comment comment) {
		commentDao.insert(comment);
	}
	
	@Override
	public Map<String, Object> list(BoardDto boardDto) {
		Map<String, Object> model = new HashMap<>();
		model.put("list", commentDao.list(boardDto));
		model.put("cnt", commentDao.selectCommentCount(boardDto));
		return model;
	}
	
	@Override
	public void update(Comment comment) {
		commentDao.update(comment);
	}
	
	@Override
	public void delete(int cno) {
		commentDao.delete(cno);
	}
	
	@Override
	public void deleteByBoardNo(int bno) {
		commentDao.deleteByBoardNo(bno);
	}
}
