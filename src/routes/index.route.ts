import { Router } from 'express';
import { Photo } from '../models/photo.model';
import multer from 'multer';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.find();
    
        /** @TODO Render Existing Photos in index.ejs */
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post(
    '/',
    /** @TODO Add multer middleware */
    async (req, res, next) => {
        try {

            /** @TODO Save Photo in database */
            res.redirect('/');

        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;