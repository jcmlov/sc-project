package bitcamp.java77.domain;

import java.util.Date;

public class Gallery {
	// 게시글 일련번호
	private int bno;
	// 소속팀 일련번호
	private int tno;
	// 작성자
	private int mno;
	// 게시글 종류
	private String btype;
	// 게시글 제목
	private String btitle;
	// 게시글 내용
	private String bcontent;
	// 게시글 등록일자
	private Date bregDate;
	// 게시글 수정일자
	private Date bmodDate;
	// 게시글 조회수
	private int bviewCnt;
	// 첨부파일 일련번호
	private int fno;
	// 첨부파일 제목
	private String foriName;
	// 첨부파일 경로
	private String fpath;
	// 갤러리 썸네일
	private String fthumb;
	// 저장된 파일이름
	private String frealName;
	// 파일 업로드 한 경로를 배열로 받는 변수
	private String files;
	// 필터의 maxDate
	private Date maxDate;
	// 필터의 minDate
	private Date minDate;
	// 파일 삭제 시 필요한 변수
	private String fileName;

	public int getBno() {
		return bno;
	}
	public Gallery setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Gallery setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getMno() {
		return mno;
	}
	public Gallery setMno(int mno) {
		this.mno = mno;
		return this;
	}
	public String getBtype() {
		return btype;
	}
	public Gallery setBtype(String btype) {
		this.btype = btype;
		return this;
	}
	public String getBtitle() {
		return btitle;
	}
	public Gallery setBtitle(String btitle) {
		this.btitle = btitle;
		return this;
	}
	public String getBcontent() {
		return bcontent;
	}
	public Gallery setBcontent(String bcontent) {
		this.bcontent = bcontent;
		return this;
	}
	public Date getBregDate() {
		return bregDate;
	}
	public Gallery setBregDate(Date bregDate) {
		this.bregDate = bregDate;
		return this;
	}
	public Date getBmodDate() {
		return bmodDate;
	}
	public Gallery setBmodDate(Date bmodDate) {
		this.bmodDate = bmodDate;
		return this;
	}
	public int getBviewCnt() {
		return bviewCnt;
	}
	public Gallery setBviewCnt(int bviewCnt) {
		this.bviewCnt = bviewCnt;
		return this;
	}
	public int getFno() {
		return fno;
	}
	public Gallery setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public String getForiName() {
		return foriName;
	}
	public Gallery setForiName(String foriName) {
		this.foriName = foriName;
		return this;
	}
	public String getFpath() {
		return fpath;
	}
	public Gallery setFpath(String fpath) {
		this.fpath = fpath;
		return this;
	}
	public String getFthumb() {
		return fthumb;
	}
	public Gallery setFthumb(String fthumb) {
		this.fthumb = fthumb;
		return this;
	}
	public String getFrealName() {
		return frealName;
	}
	public Gallery setFrealName(String frealName) {
		this.frealName = frealName;
		return this;
	}
	public String getFiles() {
		return files;
	}
	public Gallery setFiles(String files) {
		this.files = files;
		return this;
	}
	public Date getMaxDate() {
		return maxDate;
	}
	public Gallery setMaxDate(Date maxDate) {
		this.maxDate = maxDate;
		return this;
	}
	public Date getMinDate() {
		return minDate;
	}
	public Gallery setMinDate(Date minDate) {
		this.minDate = minDate;
		return this;
	}
	public String getFileName() {
		return fileName;
	}
	public Gallery setFileName(String fileName) {
		this.fileName = fileName;
		return this;
	}

}