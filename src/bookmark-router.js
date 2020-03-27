const express = require('express');
const bookmarkRouter = express.Router();
const store = require('./store');
const bodyParser = express.json();
const logger = require('./logger');
const uuid = require('uuid/v4');

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => { res.json(store.bookmarks); })
    .post(bodyParser, (req, res) => {
        const { title, url, description = '', rating } = req.body;

        for (const field of ['title', 'url', 'rating']) {
            if(!req.body[field]) {
                logger.error(`'${field}' is required`);
                return res
                    .status(400)
                    .send('Invalid data');
            }
        }
        
        const id = uuid();
        const bookmark = {
            id: uuid(),
            title,
            url,
            description,
            rating
        };

        store.bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/bookmark/${id}`)
            .json({id});
    });
            
bookmarkRouter
    .route('/bookmark/:id')
    .get((req, res) => {
        const { bookmark_id } = req.params;
        const bookmark = store.bookmarks.find(mark => mark.id === bookmark_id);

        if (!bookmark) {
            logger.error(`Oops we lost ${ bookmark_id }. Maybe it doesn't exist?`);
            return res
                .status(404)
                .send('Bookmark Not Found');
        }

        res.json(bookmark);
    })
    .delete((req, res) => {
        const { bookmark_id } = req.params;
        const bookmarkIndex = store.bookmarks.findIndex(mark => mark.id === bookmark_id);
        
        if(bookmarkIndex === -1) {
            logger.error(`Oops we lost ${ bookmark_id }. Maybe it doesn't exist?`);
            return res
                .status(404)
                .send('Bookmark Not Found');
        }
        
        store.bookmarks.splice(bookmarkIndex, 1);
        
        logger.info(`${bookmark_id} deleted.`);
        res
            .status(204)
            .end();
    });

module.exports = bookmarkRouter;
