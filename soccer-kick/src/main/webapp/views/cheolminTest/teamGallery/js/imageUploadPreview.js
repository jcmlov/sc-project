$(document)
		.ready(
				function() {
					var holder = document.getElementById('holder')
					,tests = {
						filereader : typeof FileReader != 'undefined'
						,dnd : 'draggable' in document.createElement('span')
						,formdata : !!window.FormData
						,progress : "upload" in new XMLHttpRequest
					}, support = {
						filereader : document.getElementById('filereader')
						,formdata : document.getElementById('formdata')
						,progress : document.getElementById('progress')
					}, acceptedTypes = {
						'image/png' : true
						,'image/jpeg' : true
						,'image/gif' : true
					}, progress = document.getElementById('uploadprogress')
					, fileupload = document.getElementById('upload');

					"filereader formdata progress".split(' ').forEach(
							function(api) {
								if (tests[api] === false) {
									support[api].className = 'fail';
								} else {
									support[api].className = 'hidden';
								}
							});
					
					var height = 100;
					var winHeight = 600;
					var tempWidth = 500;
					var cnt = 0;
					function previewfile(file) {
						if (tests.filereader === true && acceptedTypes[file.type] === true) {
							cnt++;
							var reader = new FileReader();
							reader.onload = function(event) {
								var image = new Image();
								image.src = event.target.result;
								image.width = 80; // a fake resize
								holder.appendChild(image);
								tempWidth = tempWidth - image.width;
								
								if(tempWidth == 100) {
									height = height + 85;
									winHeight += 85; 
									tempWidth = 500;
								}
								$("#holder").css("height", height + "px");
								$(".window").css("height", winHeight + "px");
							};

							reader.readAsDataURL(file);
						} else {
							holder.innerHTML += '<p>Uploaded '
									+ file.name
									+ ' '
									+ (file.size ? (file.size / 1024 | 0) + 'K'
											: '');
							console.log(file);
						}
					}

					function readfiles(files) {
						var formData = tests.formdata ? new FormData() : null;
						for (var i = 0; i < files.length; i++) {
							if (tests.formdata)
								formData.append('file', files[i]);
							previewfile(files[i]);
						}
						
						if (tests.formdata) {
							var xhr = new XMLHttpRequest();
							xhr.open('POST', '/devnull.php');
							xhr.onload = function() {
								progress.value = progress.innerHTML = 100;
							};

							if (tests.progress) {
								xhr.upload.onprogress = function(event) {
									if (event.lengthComputable) {
										var complete = (event.loaded / event.total * 100 | 0);
										progress.value = progress.innerHTML = complete;
									}
								}
							}

							xhr.send(formData);
						}
					}

					if (tests.dnd) {
						holder.ondragover = function() {
							this.className = 'hover';
							return false;
						};
						holder.ondragend = function() {
							this.className = '';
							return false;
						};
						holder.ondrop = function(e) {
							this.className = '';
							e.preventDefault();
							readfiles(e.dataTransfer.files);
						}
					} else {
						fileupload.className = 'hidden';
						fileupload.querySelector('input').onchange = function() {
							readfiles(this.files);
						};
					}
				});