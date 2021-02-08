// const UserMedia = require('main.class.js');
import UserMedia from './main.class';
const set = {
    video: {
        mandatory: {
            minAspectRatio: 1.777,
            maxAspectRatio: 1.778
        },
        optional: {
            maxWidth: 640,
            maxHeight: 480            
        }
    },
    audio: false
};
let media = new UserMedia();
media.getMedia(set, 'video');