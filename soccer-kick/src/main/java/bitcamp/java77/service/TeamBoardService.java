package bitcamp.java77.service;

import java.util.Map;

import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.TeamBoard;

public interface TeamBoardService {
	Map<String, Object> teamBoardList(BoardDto boardDto);
	TeamBoard selectOne(int boardNo);
	void delete(int bno);
	int regist(TeamBoard board);
	void update(TeamBoard board);
	// public void FileInsert(Fileattach fileattach);	
}