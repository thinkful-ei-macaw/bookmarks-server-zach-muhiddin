const uuid = require('uuid/v4');
const bookmarks = [
    { 
        id: uuid(),
        title: 'Google',
        url: 'https://google.com',
        description: 'A search engine.',
        rating: 4
    },
    { 
        id: uuid(),
        title: 'Thinkful',
        url: 'https://thinkful.com',
        description: 'Online coding bootcamp.',
        rating: 5
    },
    { 
        id: uuid(),
        title: 'Ebay',
        url: 'https://ebay.com',
        description: 'Buy sell trade.',
        rating: 4
    }
];

module.exports = { bookmarks };