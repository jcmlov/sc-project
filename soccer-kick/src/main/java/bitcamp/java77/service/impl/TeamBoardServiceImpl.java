package bitcamp.java77.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.TeamBoardDao;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Fileattach;
import bitcamp.java77.domain.TeamBoard;
import bitcamp.java77.service.TeamBoardService;

@Service
public class TeamBoardServiceImpl  implements TeamBoardService{

	@Autowired
	TeamBoardDao boardDao;
	
	@Override
	public Map<String, Object> teamBoardList(BoardDto boardDto) {
		Map<String, Object> model = new HashMap<>();
		model.put("list", boardDao.teamBoardList(boardDto));
		model.put("cnt", boardDao.selectTeamBoardCount(boardDto));
		return model;
	}
	
	@Override
	public TeamBoard selectOne(int bno) {
		return boardDao.selectOne(bno);
	}
	
	@Override
	public void delete(int bno) {
		boardDao.deleteFile(bno);
		boardDao.delete(bno);
	}
	
	@Override
	public int regist(TeamBoard board) {
		
		boardDao.insert(board);
		if(board.getBfile() != null) {
			Fileattach fileAttach = new Fileattach();
			
			String path = board.getBfile();
			
			fileAttach.setBno(board.getBno());
			fileAttach.setFpath(path.split("_ori_")[0]);
			fileAttach.setFrealName(path.split("attachfile")[1].split("/")[4].split("_ori_")[0]);
			fileAttach.setForiName(path.split("attachfile")[1].split("/")[4].split("_ori_")[1]);
			
			boardDao.registFile(fileAttach);
		}
		
		return board.getBno();
	}

	@Override
	public void update(TeamBoard board) {
		boardDao.update(board);
	}
	/*
	@Override
	public void FileInsert(Fileattach fileattach) {
		boardDao.insertFile(fileattach);
	}
	*/
}
