package bitcamp.java77.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.ManageMemberDao;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;
import bitcamp.java77.service.ManageMemberService;

@Service
public class ManageMemberServiceImpl implements ManageMemberService{
	@Autowired private ManageMemberDao manageMemberDao;

	@Override
	public List<Member> selectTeamMemberList(Member member) {
		return manageMemberDao.selectTeamMemberList(member);
		
	}

	@Override
	public List<Member> selectTeamApplyList(Member member) {
		return manageMemberDao.selectTeamApplyList(member);
	}

	@Override
	public Member selectTeamMember(Member member) {
		return manageMemberDao.selectTeamMember(member);
	}

	@Override
	public void updateApply(Member member) {
		manageMemberDao.updateApply(member);
	}

	@Override
	public void updateTeamPosition(Member member) {
		manageMemberDao.updateTeamPosition(member);
	}
	
	@Override
	public void updateMemberPoint(Member member) {
		manageMemberDao.updateMemberPoint(member);
	}

	@Override
	public void updateLocation(Team team) {
		manageMemberDao.updateLocation(team);
	}

	@Override
	public void updateTmemCnt(Team team) {
		manageMemberDao.updateTmemCnt(team);
	}

	@Override
	public void updateExTmemCnt(Team team) {
		manageMemberDao.updateExTmemCnt(team);
	}
	
	@Override
	public void updateExpulsion(Member member) {
		manageMemberDao.updateExpulsion(member);
	}

	@Override
	public List<Team> teamInfo() {
		return manageMemberDao.teamInfo();
	}
}