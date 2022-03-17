module.exports = {
    'file': {
        'allowedFileSize': {
            'pdf': 10000000,
            'image': 10000000
        },
        'allowedFileNumber': {
            'pdf': 1,
            'image': 1
        },
        'allowedMimeTypes': {
            'pdf': [
                'application/pdf'
            ],
            'image': [
                'image/gif',
                'image/png',
                'image/jpg',
                'image/jpeg'
            ]
        }
    },
    
    'tempDir': './tmp',
};