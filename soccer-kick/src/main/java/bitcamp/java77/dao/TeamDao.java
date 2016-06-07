package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;
import bitcamp.java77.domain.TeamDto;

public interface TeamDao {
	List<Team> list(TeamDto teamDto);
	int selectTeamCount(TeamDto teamDto);
	Team select(int tno);
	Team selectTeamInfo(int tno);
	List<Team> selectTeam();
	Member searchMembers(Member member);
	void createTeam(Team team);
	void memberIntoTeam(Member member);
}