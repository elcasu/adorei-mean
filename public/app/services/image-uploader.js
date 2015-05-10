'use strict';

angular.module("services")

  // Image uploader service
  .factory("ImageUploader", ["FileUploader", "appConfig", "ipCookie",
    function(FileUploader, appConfig, ipCookie) {
      return {
        getUploader: function(callback) {
          return new FileUploader({
            url: appConfig.apiUrl + 'upload',
            headers: {
              'access-token': ipCookie('access-token')
            },
            onSuccessItem: callback,
            autoUpload: true
          });
        }
      };
    }
  ])
;

