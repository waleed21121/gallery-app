import { Router } from 'express';
import { Photo } from '../models/photo.model';
import multer from 'multer';


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/files');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
})

const upload = multer({storage: fileStorageEngine});

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const photos = await Photo.find();
    
        /** @TODO Render Existing Photos in index.ejs */
        res.render('index', { images: photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post(
    '/',
    /** @TODO Add multer middleware */
    upload.single('image'),
    async (req, res, next) => {
        try {
            const photo = new Photo({path: req.file?.filename, title: req.body.title});
            await photo.save();
            res.redirect('/');

        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;