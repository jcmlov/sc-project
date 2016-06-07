package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class TeamDto {
	protected int	 	tno;
	protected int		pno;
	protected int		start;
	protected int		howmany;
	protected String	keyword;
	protected String	district;
	
	public String getKeyword() {
		return keyword;
	}
	public TeamDto setKeyword(String keyword) {
		this.keyword = keyword;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public TeamDto setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getPno() {
		return pno;
	}
	public TeamDto setPno(int pno) {
		this.pno = pno;
		return this;
	}
	public int getStart() {
		return start;
	}
	public TeamDto setStart(int start) {
		this.start = start;
		return this;
	}
	public int getHowmany() {
		return howmany;
	}
	public TeamDto setHowmany(int howmany) {
		this.howmany = howmany;
		return this;
	}
	public String getDistrict() {
		return district;
	}
	public TeamDto setDistrict(String district) {
		this.district = district;
		return this;
	}
}
