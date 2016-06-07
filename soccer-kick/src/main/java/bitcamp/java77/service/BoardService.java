package bitcamp.java77.service;

import java.util.List;
import java.util.Map;

import bitcamp.java77.domain.Board;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Fileattach;

public interface BoardService {
	int insert(Board board);
	void insertFile(Fileattach file);
	Map<String, Object> list(BoardDto boardDto);
	Board detail(BoardDto boardDto);
	List<Fileattach> fileList(BoardDto boardDto);
	void delete(int bno);
	void deleteFileattach(int bno);
	void updateViewCnt(int bno);
	void update(Board board);
}
