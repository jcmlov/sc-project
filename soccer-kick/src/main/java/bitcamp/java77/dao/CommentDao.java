package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;

public interface CommentDao {
	int insert(Comment comment);
	List<Comment> list(BoardDto boardDto);
	int update(Comment comment);
	int delete(int cno);
	int deleteByBoardNo(int bno);
	int selectCommentCount(BoardDto boardDto);
}
