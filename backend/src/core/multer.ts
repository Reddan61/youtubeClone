import { BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import { diskStorage } from "multer";

const videoFilter = (req,file: Express.Multer.File,cb) => {
    if(file.mimetype === 'video/mp4') {
        cb(null,true)
    } else {
        cb(new BadRequestException(),false)
    }
}

const imageFilter = (req,file: Express.Multer.File,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null,true)
    } else {
        cb(new BadRequestException(),false)
    }
}


export const multerSettings = (isImage:boolean) => ({
    storage: diskStorage({
        destination: "uploads",
        filename(req,file: Express.Multer.File,cb) {
            const date = moment().format("DDMMYYYY-HHmmss-SSS");
            cb(null, `${date}--${file.originalname}`)
        }
    }),
    fileFilter: isImage ? imageFilter : videoFilter
})