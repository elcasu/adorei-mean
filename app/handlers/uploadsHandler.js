var fs = require("fs");

function uploadTemp(req, res) {
  // Files are uploaded directly through multer middleware
  var filename = req.files.file.path.replace(/^.*\/([^\/]+)$/, "$1");
  res.send({
    tmp: filename
  });
}

function showImage(req, res) {
  var filename = req.params.image_file;
  var ext = filename.replace(/^.*\.([^\.]+)$/, "$1");
  var img = fs.readFileSync('./uploads/' + filename);
  res.writeHead(200, {'Content-Type': 'image/' + ext + ';base64' });
  res.end(new Buffer(img).toString('base64'));
}

exports.uploadTemp = uploadTemp;
exports.showImage = showImage;
