/// <reference types="multer" />
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
export declare const storage: {
    storage: import("multer").StorageEngine;
};
export declare class PictureController {
    private readonly pictureService;
    constructor(pictureService: PictureService);
    uploadFile(createPictureDto: CreatePictureDto, userId: User, file: any): Promise<import("./entities/picture.entity").Picture>;
    findAll(): Promise<import("./entities/picture.entity").Picture[]>;
    getFileById(id: string, response: Response): Promise<import("./entities/picture.entity").Picture>;
    update(id: string, updatePictureDto: UpdatePictureDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
