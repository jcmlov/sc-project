package bitcamp.java77.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.BoardDao;
import bitcamp.java77.domain.Board;
import bitcamp.java77.domain.BoardDto;
import bitcamp.java77.domain.Fileattach;
import bitcamp.java77.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService{
	@Autowired private BoardDao boardDao;
	
	@Override
	public int insert(Board board) {
		boardDao.insert(board);
		return board.getBno();
	}
	
	@Override
	public void insertFile(Fileattach file) {
		boardDao.insertFile(file);
	}
	
	@Override
	public Map<String, Object> list(BoardDto boardDto) {
		Map<String, Object> model = new HashMap<>();
		model.put("list", boardDao.list(boardDto));
		model.put("cnt", boardDao.selectBoardCount(boardDto));
		return model;
	}
	
	@Override
	public Board detail(BoardDto boardDto) {
		return boardDao.detail(boardDto);
	}
	
	@Override
	public List<Fileattach> fileList(BoardDto boardDto) {
		return boardDao.fileList(boardDto);
	}
	
	@Override
	public void delete(int bno) {
		boardDao.delete(bno);
	}
	
	@Override
	public void deleteFileattach(int bno) {
		boardDao.deleteFileattach(bno);
	}
	
	@Override
	public void updateViewCnt(int bno) {
		boardDao.updateViewCnt(bno);
	}
	
	@Override
	public void update(Board board) {
		boardDao.update(board);	
	}
}
