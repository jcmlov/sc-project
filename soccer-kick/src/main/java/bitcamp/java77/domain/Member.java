package bitcamp.java77.domain;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class Member {
	protected int 		mno;
	protected int 		tno;
	protected int 		mplayCnt;
	protected int 		mgoalCnt;
	protected int 		msupportCnt;
	protected int 		mlossCnt;
	protected int		mapplyTno;
	protected String 	mname;
	protected String 	mpath;
	protected String 	memail;
	protected String 	mpno;
	protected String 	mpass;
	protected String 	mbaseAddr;
	protected String 	mdetAddr;
	protected String 	mposname;
	protected String 	mgender;
	protected String 	menterYN;
	protected String 	mleaderYN;
	protected String 	mapplyYN;
	protected Date 		mbirth;
	
	public int getMapplyTno() {
		return mapplyTno;
	}
	public Member setMapplyTno(int mapplyTno) {
		this.mapplyTno = mapplyTno;
		return this;
	}
	public int getMno() {
		return mno;
	}
	public Member setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Member setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getMplayCnt() {
		return mplayCnt;
	}
	public Member setMplayCnt(int mplayCnt) {
		this.mplayCnt = mplayCnt;
		return this;
	}
	public int getMgoalCnt() {
		return mgoalCnt;
	}
	public Member setMgoalCnt(int mgoalCnt) {
		this.mgoalCnt = mgoalCnt;
		return this;
	}
	public int getMsupportCnt() {
		return msupportCnt;
	}
	public Member setMsupportCnt(int msupportCnt) {
		this.msupportCnt = msupportCnt;
		return this;
	}
	public int getMlossCnt() {
		return mlossCnt;
	}
	public Member setMlossCnt(int mlossCnt) {
		this.mlossCnt = mlossCnt;
		return this;
	}
	public String getMname() {
		return mname;
	}
	public Member setMname(String mname) {
		this.mname = mname;
		return this;
	}
	public String getMpath() {
		return mpath;
	}
	public Member setMpath(String mpath) {
		this.mpath = mpath;
		return this;
	}
	public String getMemail() {
		return memail;
	}
	public Member setMemail(String memail) {
		this.memail = memail;
		return this;
	}
	public String getMpno() {
		return mpno;
	}
	public Member setMpno(String mpno) {
		this.mpno = mpno;
		return this;
	}
	public String getMpass() {
		return mpass;
	}
	public Member setMpass(String mpass) {
		this.mpass = mpass;
		return this;
	}
	public String getMbaseAddr() {
		return mbaseAddr;
	}
	public Member setMbaseAddr(String mbaseAddr) {
		this.mbaseAddr = mbaseAddr;
		return this;
	}
	public String getMdetAddr() {
		return mdetAddr;
	}
	public Member setMdetAddr(String mdetAddr) {
		this.mdetAddr = mdetAddr;
		return this;
	}
	public String getMposname() {
		return mposname;
	}
	public Member setMposname(String mposname) {
		this.mposname = mposname;
		return this;
	}
	public String getMgender() {
		return mgender;
	}
	public Member setMgender(String mgender) {
		this.mgender = mgender;
		return this;
	}
	public String getMenterYN() {
		return menterYN;
	}
	public Member setMenterYN(String menterYN) {
		this.menterYN = menterYN;
		return this;
	}
	public String getMleaderYN() {
		return mleaderYN;
	}
	public Member setMleaderYN(String mleaderYN) {
		this.mleaderYN = mleaderYN;
		return this;
	}
	public String getMapplyYN() {
		return mapplyYN;
	}
	public Member setMapplyYN(String mapplyYN) {
		this.mapplyYN = mapplyYN;
		return this;
	}
	public Date getMbirth() {
		return mbirth;
	}
	public Member setMbirth(Date mbirth) {
		this.mbirth = mbirth;
		return this;
	}
	@Override
	public String toString() {
		return "Member [mno=" + mno + ", tno=" + tno + ", mplayCnt=" + mplayCnt + ", mgoalCnt=" + mgoalCnt
				+ ", msupportCnt=" + msupportCnt + ", mlossCnt=" + mlossCnt + ", mname=" + mname + ", mpath=" + mpath
				+ ", memail=" + memail + ", mpno=" + mpno + ", mpass=" + mpass + ", mbaseAddr=" + mbaseAddr
				+ ", mdetAddr=" + mdetAddr + ", mposname=" + mposname + ", mgender=" + mgender + ", menterYN="
				+ menterYN + ", mleaderYN=" + mleaderYN + ", mapplyYN=" + mapplyYN + ", mbirth=" + mbirth + "]";
	}
	
}
