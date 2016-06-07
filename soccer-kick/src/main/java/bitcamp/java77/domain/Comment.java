package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class Comment {
	protected int 		cno;
	protected int 		bno;
	protected int 		mno;
	protected String	mname;
	protected String	mpath;
	protected String	memail;
	protected String 	ccontent;
	protected String 	cregDate;
	
	
	public String getMemail() {
		return memail;
	}
	public Comment setMemail(String memail) {
		this.memail = memail;
		return this;
	}
	public String getMname() {
		return mname;
	}
	public Comment setMname(String mname) {
		this.mname = mname;
		return this;
	}
	public String getMpath() {
		return mpath;
	}
	public Comment setMpath(String mpath) {
		this.mpath = mpath;
		return this;
	}
	public int getCno() {
		return cno;
	}
	public Comment setCno(int cno) {
		this.cno = cno;
		return this;
	}
	public int getBno() {
		return bno;
	}
	public Comment setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public int getMno() {
		return mno;
	}
	public Comment setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public String getCcontent() {
		return ccontent;
	}
	public Comment setCcontent(String ccontent) {
		this.ccontent = ccontent;
		return this;
	}
	public String getCregDate() {
		return cregDate;
	}
	public Comment setCregDate(String cregDate) {
		this.cregDate = cregDate;
		return this;
	}
	@Override
	public String toString() {
		return "Comment [cno=" + cno + ", bno=" + bno + ", mno=" + mno + ", mname=" + mname + ", mpath=" + mpath
				+ ", memail=" + memail + ", ccontent=" + ccontent + ", cregDate=" + cregDate + "]";
	}
	
}
