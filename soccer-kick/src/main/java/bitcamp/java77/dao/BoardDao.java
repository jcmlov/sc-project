package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Board;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Fileattach;

public interface BoardDao {
	int insert(Board board);
	int insertFile(Fileattach file);
	List<Board> list(BoardDto boardDto);
	Board detail(BoardDto boardDto);
	List<Fileattach> fileList(BoardDto boardDto);
	int delete(int bno);
	int deleteFileattach(int bno);
	int update(Board board);
	int updateViewCnt(int bno);
	int selectBoardCount(BoardDto boardDto);
}
