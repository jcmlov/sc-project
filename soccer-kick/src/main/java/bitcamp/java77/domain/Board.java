package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class Board {
	protected int 		bno;
	protected int 		tno;
	protected int 		mno;
	protected int 		bviewCnt;
	protected int		bcommentCnt;
	protected int		rnum;
	protected String 	btype;
	protected String 	btitle;
	protected String 	bwriter;
	protected String	bwriterPhotoPath;
	protected String 	bcontent;
	protected String 	bregDate;
	protected String 	bmodDate;
	
	public int getRnum() {
		return rnum;
	}
	public Board setRnum(int rnum) {
		this.rnum = rnum;
		return this;
	}
	public int getBcommentCnt() {
		return bcommentCnt;
	}
	public Board setBcommentCnt(int bcommentCnt) {
		this.bcommentCnt = bcommentCnt;
		return this;
	}
	public String getBwriterPhotoPath() {
		return bwriterPhotoPath;
	}
	public Board setBwriterPhotoPath(String bwriterPhotoPath) {
		this.bwriterPhotoPath = bwriterPhotoPath;
		return this;
	}
	public String getBwriter() {
		return bwriter;
	}
	public void setBwriter(String bwriter) {
		this.bwriter = bwriter;
	}
	public int getBno() {
		return bno;
	}
	public Board setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Board setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getMno() {
		return mno;
	}
	public Board setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public int getBviewCnt() {
		return bviewCnt;
	}
	public Board setBviewCnt(int bviewCnt) {
		this.bviewCnt = bviewCnt;
		return this;
	}
	public String getBtype() {
		return btype;
	}
	public Board setBtype(String btype) {
		this.btype = btype;
		return this;
	}
	public String getBtitle() {
		return btitle;
	}
	public Board setBtitle(String btitle) {
		this.btitle = btitle;
		return this;
	}
	public String getBcontent() {
		return bcontent;
	}
	public Board setBcontent(String bcontent) {
		this.bcontent = bcontent;
		return this;
	}
	public String getBregDate() {
		return bregDate;
	}
	public Board setBregDate(String bregDate) {
		this.bregDate = bregDate;
		return this;
	}
	public String getBmodDate() {
		return bmodDate;
	}
	public Board setBmodDate(String bmodDate) {
		this.bmodDate = bmodDate;
		return this;
	}
	@Override
	public String toString() {
		return "Board [bno=" + bno + ", tno=" + tno + ", mno=" + mno + ", bviewCnt=" + bviewCnt + ", btype=" + btype
				+ ", btitle=" + btitle + ", bwriter=" + bwriter + ", bcontent=" + bcontent + ", bregDate=" + bregDate
				+ ", bmodDate=" + bmodDate + "]";
	}
}
