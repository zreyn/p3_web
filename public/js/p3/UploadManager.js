define(["dojo/request", "dojo/_base/declare","dojo/_base/lang", "dojo/_base/Deferred","dojo/topic"],function(xhr,declare,lang,Deferred,Topic){

	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	var UploadManager = (declare([], {
		constructor: function(){
			this._inProgress={};
		},
		token: null,
		upload: function(files, token){
			if (token) {
				this.token=token;
				this.headers = {
					Authorization: "OAuth " + token
				}
			}
			var _self=this;
			if (files instanceof Array){
				files.forEach(function(obj){
					_self._uploadFile(obj.file, obj.url);
				});
			}else if (files && files.file){
				_self._uploadFile(files.file, files.url);
			}
		},	

		_uploadFile: function(file, url) {	
			var def = new Deferred();
			var fd = new FormData();
			fd.append("upload", file);

			req = new XMLHttpRequest();
			req.upload.addEventListener("progress", function(evt){
				console.log("evt: ", evt);
				console.log("progress: ", (evt.loaded / evt.total)*100);
				Topic.publish("/upload", {type: "UploadProgress", filename: file.name, event: evt, progress: parseInt((evt.loaded/evt.total)*100), url:url})
			});

			req.upload.addEventListener("load", function(data){
				Topic.publish("/upload", {type: "UploadComplete", filename: file.name, url: url})
				def.resolve(data);
			});
	
			req.upload.addEventListener("error", function(error){
				console.log("Error Uploading File: ", error);
				def.reject(error);
			});

			req.open("PUT", url, true);

			for (var prop in this.headers){
				console.log("Set Request Header: ", prop, this.headers[prop]);
				req.setRequestHeader(prop, this.headers[prop]);
			}

			Topic.publish("/upload", {type: "UploadStart", filename: file.name, url: url})
			req.send(fd);
			return def.promise;

			/*
			this.headers['X-Requested-With']=null;
			return xhr.put(url, {
				headers: this.headers,
				data:fd
			}).then(function(data){
				console.log("after put data : ", data);
				return data;
			}, function(err){
				console.log("Error Uploading File: ", err);
			}, function(evt){
				console.log("Percent = ", (evt.loaded / evt.total)*100);
			});
			*/
		}

	}))()

	return UploadManager;
});
