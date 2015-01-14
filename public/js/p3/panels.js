define([],function(){
	
	return {
            CreateWorkspace: {
                title: "Create Workspace",
                layer: "p3/layer/panels",
                ctor: "p3/widget/CreateWorkspace",
                dataParam: "userId",
                params: {}
            },
            CreateFolder: {
                title: "Create Folder",
                layer: "p3/layer/panels",
                ctor: "p3/widget/CreateFolder",
                dataParam: "path",
                params: {}
            },
            Upload: {
                title: "Upload",
                layer: "p3/layer/panels",
                ctor: "p3/widget/Uploader",
                dataParam: "folder",
                params: {}
            
            }
	
	}

})