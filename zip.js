const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const directoryPath = path.join(__dirname, 'srcBuild/lambda');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }
    files.forEach((file) => {
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        const filePath = path.join(directoryPath, file);

        const output = fs.createWriteStream(__dirname + '/build/' + file + '.zip');

        archive.on('error', function (err) {
            throw err;
        });

        archive.pipe(output);
        archive.file(filePath, { name: file });
        archive.file(__dirname + '/package.json', { name: 'package.json' });
        archive.directory(__dirname + '/srcBuild/models', 'models');
        archive.directory(__dirname + '/srcBuild/utils', 'utils');
        archive.directory(__dirname + '/node_modules', 'node_modules');
        archive.finalize();
    });
});