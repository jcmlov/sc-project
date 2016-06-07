package bitcamp.java77.domain;

import org.springframework.stereotype.Component;

@Component
public class LoginDto {
	protected String memail;
	protected String mpass;
	protected boolean useCookie;
	
	public String getMemail() {
		return memail;
	}
	public LoginDto setMemail(String memail) {
		this.memail = memail;
		return this;
	}
	public String getMpass() {
		return mpass;
	}
	public LoginDto setMpass(String mpass) {
		this.mpass = mpass;
		return this;
	}
	public boolean isUseCookie() {
		return useCookie;
	}
	public LoginDto setUseCookie(boolean useCookie) {
		this.useCookie = useCookie;
		return this;
	}
}
