package bitcamp.java77.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bitcamp.java77.dao.GalleryDao;
import bitcamp.java77.domain.Gallery;
import bitcamp.java77.service.GalleryService;

@Transactional 
@Service
public class GalleryServiceImpl implements GalleryService {
	
	@Autowired private GalleryDao galleryDao;
	
	@Override
	public void galleryInsert(Gallery gallery) throws Exception {
		galleryDao.galleryInsert(gallery);
		
		String[] files = gallery.getFiles().split("\\?");		
		if(files == null) {
			return;
		}
		
		for(String file: files) {
			galleryDao.addAttachFile(gallery.setFpath(file.split("s_")[0])
						.setFrealName(file.split("s_")[0] + file.split("s_")[1])
						.setForiName(file.split("s_")[0] + "md_" + file.split("s_")[1])
						.setFthumb(file));
		}
	}
	
	@Override
	public void galleryUpdate(Gallery gallery) throws Exception {
		galleryDao.galleryUpdate(gallery);
		
		String[] files = gallery.getFiles().split("\\?");
		
		if(files == null) {
			galleryDao.deleteGalleryFile(gallery);
		}
		
		for(String file: files) {
			galleryDao.updateAttachFile(gallery.setFpath(file.split("s_")[0])
						.setFrealName(file.split("s_")[0] + file.split("s_")[1])
						.setForiName(file.split("s_")[0] + "md_" + file.split("s_")[1])
						.setFthumb(file));
		}
	}
	
	@Override
	public void deleteGalleryFile(Gallery gallery) throws Exception {
		galleryDao.deleteGalleryFile(gallery);
	}
}