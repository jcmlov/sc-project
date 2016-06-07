package bitcamp.java77.domain;

import java.sql.Date;

public class TeamBoard {
	protected int bno;
	protected int tno;
	protected int mno;
	protected int fno;
	protected int bviewCnt;
	protected String btype;
	protected String btitle;
	protected String bcontent;
	protected Date bregDate;
	protected Date bmodDate;
	protected String mname;
	protected String bfile;
	protected String foriName;
	protected String frealName;
	protected String fpath;
	protected String fthumb;
	
	public int getBno() {
		return bno;
	}
	public TeamBoard setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public TeamBoard setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getMno() {
		return mno;
	}
	public TeamBoard setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public int getFno() {
		return fno;
	}
	public TeamBoard setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public int getBviewCnt() {
		return bviewCnt;
	}
	public TeamBoard setBviewCnt(int bviewCnt) {
		this.bviewCnt = bviewCnt;
		return this;
	}
	public String getBtype() {
		return btype;
	}
	public TeamBoard setBtype(String btype) {
		this.btype = btype;
		return this;
	}
	public String getBtitle() {
		return btitle;
	}
	public TeamBoard setBtitle(String btitle) {
		this.btitle = btitle;
		return this;
	}
	public String getBcontent() {
		return bcontent;
	}
	public TeamBoard setBcontent(String bcontent) {
		this.bcontent = bcontent;
		return this;
	}
	public Date getBregDate() {
		return bregDate;
	}
	public TeamBoard setBregDate(Date bregDate) {
		this.bregDate = bregDate;
		return this;
	}
	public Date getBmodDate() {
		return bmodDate;
	}
	public TeamBoard setBmodDate(Date bmodDate) {
		this.bmodDate = bmodDate;
		return this;
	}
	public String getMname() {
		return mname;
	}
	public TeamBoard setMname(String mname) {
		this.mname = mname;
		return this;
	}
	public String getBfile() {
		return bfile;
	}
	public TeamBoard setBfile(String bfile) {
		this.bfile = bfile;
		return this;
	}
	public String getForiName() {
		return foriName;
	}
	public TeamBoard setForiName(String foriName) {
		this.foriName = foriName;
		return this;
	}
	public String getFrealName() {
		return frealName;
	}
	public TeamBoard setFrealName(String frealName) {
		this.frealName = frealName;
		return this;
	}
	public String getFpath() {
		return fpath;
	}
	public TeamBoard setFpath(String fpath) {
		this.fpath = fpath;
		return this;
	}
	public String getFthumb() {
		return fthumb;
	}
	public TeamBoard setFthumb(String fthumb) {
		this.fthumb = fthumb;
		return this;
	}
}
