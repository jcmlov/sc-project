package bitcamp.java77.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import bitcamp.java77.domain.Team;
import bitcamp.java77.domain.TeamDto;

public interface TeamService {
	Map<String, Object> list(TeamDto teamDto);
	Team select(int tno);
	void createTeam(Team team, HttpSession session);
}
