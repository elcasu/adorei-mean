var fs = require("fs");
var gm = require("gm").subClass({ imageMagick: true });

function uploadTemp(req, res) {
  // Files are uploaded directly through multer middleware
  var filename = req.files.file.path.replace(/^.*\/([^\/]+)$/, "$1");
  res.send({
    tmp: filename
  });
}

function showImage(req, res, next) {
  var filename = req.params.image_file;
  var ext = filename.replace(/^.*\.([^\.]+)$/, "$1");
  var sizes = req.params.dim.split("x");
  if(sizes.length == 2) {
    console.log('./uploads/' + filename);
    gm('./uploads/' + filename)
      .resize(parseInt(sizes[0]), parseInt(sizes[1]))
      .stream(function (err, stdout, stderr) {
        if(err) return next(err);

        var chunk = [];
        stdout.on('data', function(data){
          chunk.push(data);
        });

        stdout.on('end', function(){
          if(chunk.length == 0) {
            return res.status(404).send({ message: "Image not found" });
          }
          var image = Buffer.concat(chunk);
          res.send(image.toString('base64'));
          stdout.pipe(res);
        });
      });
  }
  /*
  var img = fs.readFileSync('./uploads/' + filename);
  res.writeHead(200, {'Content-Type': 'image/' + ext + ';base64' });
  res.end(new Buffer(img).toString('base64'));
  */
}

exports.uploadTemp = uploadTemp;
exports.showImage = showImage;
