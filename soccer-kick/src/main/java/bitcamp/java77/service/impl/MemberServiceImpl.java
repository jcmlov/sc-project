package bitcamp.java77.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.MemberDao;
import bitcamp.java77.domain.LoginDto;
import bitcamp.java77.domain.Member;
import bitcamp.java77.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired private MemberDao memberDao;
	
	@Override
	public List<Member> list(int tno) {
		return memberDao.list(tno);
	}
	
	@Override
	public void insert(Member member) {
		memberDao.insert(member);
	}
	
	@Override
	public void updatePhoto(Member member) {
		memberDao.updatePhoto(member);
	}
	@Override
	public void updateProfile(Member member) {
		memberDao.updateProfile(member);
	}
	
	@Override
	public void updateApplyTno(Member member) {
		memberDao.updateApplyTno(member);
	}
	
	@Override
	public Member retrieve(LoginDto loginDto) {
		return memberDao.retrieve(loginDto);
	}
	
}
