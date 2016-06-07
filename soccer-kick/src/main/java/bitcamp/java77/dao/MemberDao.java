package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.LoginDto;
import bitcamp.java77.domain.Member;

public interface MemberDao {
	List<Member> list(int tno);
	int insert(Member member);
	int updatePhoto(Member member);
	int updateProfile(Member member);
	int updateApplyTno(Member member);
	Member retrieve(LoginDto loginDto);
}
