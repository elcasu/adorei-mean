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
              'access-token': ipCookie('access-token'),
              'token-type': ipCookie('token-type'),
              'client': ipCookie('client'),
              'uid': ipCookie('uid')
            },
            onSuccessItem: callback,
            autoUpload: true
          });
        }
      };
    }
  ])
;

