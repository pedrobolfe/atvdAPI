var fs = require('fs'),
  cloudconvert = new (require('cloudconvert'))('');

fs.createReadStream('valorinput.mp4')
.pipe(cloudconvert.convert({
    "inputformat": "mp4,
    "outputdormat": "mp3",
    "input": "upload"
})).pipe(fs.createWriteStream("outputfile.mp3"));
