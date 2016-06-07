package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class Team {
	protected int 		tno;
	protected int 		lno;
	protected int 		tmemCnt;
	protected String 	tname;
	protected String 	tepath;
	protected String 	tcontent;
	protected String  	tpoint;
	protected String  	tregDate;
	protected String 	tleader;
	protected String 	tleaderEmail;
	protected String 	mnos;
	protected double  	tlatitude;
	protected double  	tlongitude;

	
	public String getMnos() {
		return mnos;
	}
	public Team setMnos(String mnos) {
		this.mnos = mnos;
		return this;
	}
	public String getTleader() {
		return tleader;
	}
	public Team setTleader(String tleader) {
		this.tleader = tleader;
		return this;
	}
	public String getTleaderEmail() {
		return tleaderEmail;
	}
	public Team setTleaderEmail(String tleaderEmail) {
		this.tleaderEmail = tleaderEmail;
		return this;
	}
	public String getTpoint() {
		return tpoint;
	}
	public Team setTpoint(String tpoint) {
		this.tpoint = tpoint;
		return this;
	}
	public double getTlatitude() {
		return tlatitude;
	}
	public Team setTlatitude(double tlatitude) {
		this.tlatitude = tlatitude;
		return this;
	}
	public double getTlongitude() {
		return tlongitude;
	}
	public Team setTlongitude(double tlongitude) {
		this.tlongitude = tlongitude;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Team setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getLno() {
		return lno;
	}
	public Team setLno(int lno) {
		this.lno = lno;
		return this;
	}
	public int getTmemCnt() {
		return tmemCnt;
	}
	public Team setTmemCnt(int tmemCnt) {
		this.tmemCnt = tmemCnt;
		return this;
	}
	public String getTname() {
		return tname;
	}
	public Team setTname(String tname) {
		this.tname = tname;
		return this;
	}
	public String getTepath() {
		return tepath;
	}
	public Team setTepath(String tepath) {
		this.tepath = tepath;
		return this;
	}
	public String getTcontent() {
		return tcontent;
	}
	public Team setTcontent(String tcontent) {
		this.tcontent = tcontent;
		return this;
	}
	public String getTregDate() {
		return tregDate;
	}
	public Team setTregDate(String tregDate) {
		this.tregDate = tregDate;
		return this;
	}
}
