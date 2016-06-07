package bitcamp.java77.service;

import java.util.List;

import bitcamp.java77.domain.LoginDto;
import bitcamp.java77.domain.Member;

public interface MemberService {
	List<Member> list(int tno);
	void insert(Member member);
	void updatePhoto(Member member);
	void updateProfile(Member member);
	void updateApplyTno(Member member);
	Member retrieve(LoginDto loginDto);
}
