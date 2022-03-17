const Busboy = require('busboy');

const fs = require('fs');
const uuid = require('uuid');

const { config, error } = require('../../../../constant');
const { ApiError, getApiError } = require('../../../../lib/utils');

//PutObject

//var params = {Bucket: 'bucket', Key: 'key', Expires: 60};
//var url = s3.getSignedUrl('getObject', params);

//var params = {Bucket: 'bucket', Key: 'key', Expires: 60};
//var promise = s3.getSignedUrlPromise('getObject', params);

//var params = {Bucket: 'bucket', Key: 'key', Body: stream};
//var options = {partSize: 10 * 1024 * 1024, queueSize: 1};
//s3.upload(params, options, function(err, data) {
  //console.log(err, data);
//});


const uploadHandler = (destination, content) => {

    return (req, res, next) => { 
        
        //console.log(destination, '===', content);

        try { 
            const busboy = new Busboy({
                headers: req.headers,
                limits: {
                    /**
                     * Default
                     * fieldNameSize - 100 bytes
                     * fieldSize - 1 MB
                     * fields - Infinity
                     * fileSize - Infinity
                     * files - Infinity
                     */
                    fileSize: config['file']['allowedFileSize'][content],//maxSizeBytes
                    files: config['file']['allowedFileNumber'][content] || 1
                }
            });

            let index = -1;
            req.files = [];

            busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, transferEncoding, mimeType) => {
                req.body[fieldname] = val;
            });

            busboy.on('file', (fieldname, file, filename, transferEncoding, mimeType) => {

                    //console.log('content', content, 'mimeType', mimeType);
                    if (config['file']['allowedMimeTypes'][content].indexOf(mimeType.toLowerCase()) < 0) {
                        return next(getApiError(error.FILE_FORMAT_UNSUPPORTED));
                    }
                    else {
                        index++;
                        //file.resume();

                        const path = destination + uuid.v4() + '_' + filename;

                        file.pipe(fs.createWriteStream(path));
                        
                        req.files[index] = {
                            path,
                            //size,
                            mimeType,
                            filename,
                            fieldname
                        };

                        file.on('limit', (data) => {
                            return next(getApiError(error.FILE_TOO_LARGE));
                            //upload.abort();
                        });

                        //file.on('data', (data) => {
                        //})

                        //file.on('end', () => {
                        //})
                    }
            });

            busboy.on('finish', () => {
                return next(index === -1 ? getApiError(error.FILE_NOT_FOUND) : '');
            });

            busboy.on('error', (err) => {
                return next(err instanceof ApiError ? err : getApiError(error.UPLOAD_ERROR, err.message))
            });

            req.pipe(busboy);
        } 
        catch(err) {
            next(err);
        }
    };
};


module.exports = uploadHandler;