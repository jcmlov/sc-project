package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Gallery;
import bitcamp.java77.domain.Team;

public interface GalleryDao {
	
	List<Gallery> selectGalleryList(int tno);
	
	List<Gallery> selectFilterData(int tno);
	
	Gallery selectGalleryDetail(Gallery gallery);
	
	int galleryInsert(Gallery gallery);
	
	void galleryUpdate(Gallery gallery);
	
	void addAttachFile(Gallery gallery);
	
	void updateAttachFile(Gallery gallery);
	
	void deleteGalleryFile(Gallery gallery);
	
	Team selectTeamInfo(int tno);
	
	List<Team> selectTeamInfoList(int tno);
}