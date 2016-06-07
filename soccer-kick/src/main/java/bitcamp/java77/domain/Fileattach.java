package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class Fileattach {
	protected int 		fno;
	protected int 		bno;
	protected String 	foriName;
	protected String 	frealName;
	protected String 	fpath;
	protected String 	fthumb;
	
	public int getFno() {
		return fno;
	}
	public Fileattach setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public int getBno() {
		return bno;
	}
	public Fileattach setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public String getForiName() {
		return foriName;
	}
	public Fileattach setForiName(String foriName) {
		this.foriName = foriName;
		return this;
	}
	public String getFrealName() {
		return frealName;
	}
	public Fileattach setFrealName(String frealName) {
		this.frealName = frealName;
		return this;
	}
	public String getFpath() {
		return fpath;
	}
	public Fileattach setFpath(String fpath) {
		this.fpath = fpath;
		return this;
	}
	public String getFthumb() {
		return fthumb;
	}
	public Fileattach setFthumb(String fthumb) {
		this.fthumb = fthumb;
		return this;
	}
}
