package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Board;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Fileattach;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.TeamBoard;

public interface TeamBoardDao {
	List<Board> teamBoardList(BoardDto boardDto);
	int selectTeamBoardCount(BoardDto boardDto);
	List<TeamBoard> selectList();
	Member userSelect(int mno);
	Comment commentSelectOne(int cno);
	int insert(TeamBoard board);
	int delete(int bno);
	int deleteFile(int bno);
	void update(TeamBoard board);
	TeamBoard selectOne(int bno);
	int selectNo();
	void registFile (Fileattach fileattach);
	void insert(String string);
	
}