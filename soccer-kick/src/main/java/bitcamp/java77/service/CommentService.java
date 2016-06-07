package bitcamp.java77.service;

import java.util.Map;

import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;

public interface CommentService {
	void insert(Comment comment);
	Map<String, Object> list(BoardDto boardDto);
	void delete(int cno);  
	void deleteByBoardNo(int bno);
	void update(Comment comment);
}
