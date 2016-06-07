package bitcamp.java77.service;

import bitcamp.java77.domain.Gallery;

public interface GalleryService { 
	public void galleryInsert(Gallery gallery) throws Exception;
	public void galleryUpdate(Gallery gallery) throws Exception;
	public void deleteGalleryFile(Gallery gallery) throws Exception;
}