package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class BoardDto {
	protected int 		tno;
	protected int		bno;
	protected int		pno;
	protected int		start;
	protected int		howmany;
	protected String 	btype;
	protected String	keyword;
	protected String	category;
	
	public String getCategory() {
		return category;
	}
	public BoardDto setCategory(String category) {
		this.category = category;
		return this;
	}
	public String getKeyword() {
		return keyword;
	}
	public BoardDto setKeyword(String keyword) {
		this.keyword = keyword;
		return this;
	}
	public int getHowmany() {
		return howmany;
	}
	public BoardDto setHowmany(int howmany) {
		this.howmany = howmany;
		return this;
	}
	public int getPno() {
		return pno;
	}
	public BoardDto setPno(int pno) {
		this.pno = pno;
		return this;
	}
	public int getStart() {
		return start;
	}
	public BoardDto setStart(int start) {
		this.start = start;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public BoardDto setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getBno() {
		return bno;
	}
	public BoardDto setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public String getBtype() {
		return btype;
	}
	public BoardDto setBtype(String btype) {
		this.btype = btype;
		return this;
	}
}
