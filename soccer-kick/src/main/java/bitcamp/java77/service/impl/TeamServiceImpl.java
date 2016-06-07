package bitcamp.java77.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.TeamDao;
import bitcamp.java77.domain.Member;
import bitcamp.java77.domain.Team;
import bitcamp.java77.domain.TeamDto;
import bitcamp.java77.service.TeamService;

@Service
public class TeamServiceImpl implements TeamService{
	@Autowired private TeamDao teamDao;
	
	@Override
	public Map<String, Object> list(TeamDto teamDto) {
		Map<String, Object> model = new HashMap<>();
		model.put("list", teamDao.list(teamDto));
		model.put("cnt", teamDao.selectTeamCount(teamDto));
		return model;
	}
	
	@Override
	public Team select(int tno) {
		return teamDao.select(tno);
	}
	
	@Override
	public void createTeam(Team team, HttpSession session) {
		
		String[] mnos = team.getMnos().split("\\?");
		
		team.setTmemCnt(mnos.length);
		teamDao.createTeam(team);
		
		int cnt = 0;
		
		Member loginUser = (Member)session.getAttribute("loginUser");
		
		for(String mno: mnos) {
			Member member = new Member();
			
			if(cnt++ == 0) {
				member.setMleaderYN("Y");
				
				session.setAttribute("loginUser", loginUser.setTno(team.getTno()));
				session.setAttribute("loginUser", loginUser.setMleaderYN("Y"));
			} else {
				member.setMleaderYN("N");
			}
			member.setMno(Integer.parseInt(mno));
			member.setTno(team.getTno());
			
			teamDao.memberIntoTeam(member);
		}
	}
}