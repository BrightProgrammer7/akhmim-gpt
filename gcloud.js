var projectID = process.env.GCLOUD_PROJECT;

var gcloud = {
    projectId: projectID,
    // The path to your key file:
    keyFilename: '/path/to/keyfile.json',

    // Or the contents of the key file:
    credentials: require('./path/to/keyfile.json'),

    // For any APIs that accept an API key:
    key: '...'
};


var datastore = require('@google-cloud/datastore')(gcloud);
var storage = require('@google-cloud/storage')(gcloud);
