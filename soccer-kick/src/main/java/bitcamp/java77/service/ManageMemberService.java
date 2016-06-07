package bitcamp.java77.service;

import java.util.List;

import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;

public interface ManageMemberService {
	List<Member> selectTeamMemberList(Member member);
	List<Member> selectTeamApplyList(Member member);
	Member selectTeamMember(Member member);
	void updateApply(Member member);
	void updateTeamPosition(Member member);
	void updateMemberPoint(Member member);
	void updateLocation(Team team);
	void updateTmemCnt(Team team);
	void updateExTmemCnt(Team team);
	void updateExpulsion(Member member);
	List<Team> teamInfo();
}