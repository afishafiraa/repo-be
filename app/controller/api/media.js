const { PrismaClient } = require('@prisma/client')
const qr = require('node-qr-image');
const imagekit = require('../../../utils/imagekit')

const prisma = new PrismaClient();

module.exports = {
    uploadImage: async (req, res) => {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        return res.status(200).json({
            status : true,
            message : 'success',
            data : {
                image_url : imageUrl
            }
        })
    },
    uploadFile: async (req, res) => {
        const fileUrl = `${req.protocol}://${req.get('host')}/file/${req.file.filename}`

        return res.status(200).json({
            status : true,
            message : 'success',
            data : {
                file_url : fileUrl
            }
        })
    },
    uploadVideo: async (req, res) => {
        const videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`

        return res.status(200).json({
            status : true,
            message : 'success',
            data : {
                video_url : videoUrl
            }
        })
    },
    qrcode: async (req, res) => {
        const { url } = req.body;

        const qrCode = qr.image(url, { type : 'png'});
        res.setHeader("Content-Type", "image/png")

        qrCode.pipe(res)

        // res.status(200).send(qrCode)
    },
    imagekitUpload: async (req, res) => {
        try {
            //mengubah file menjadi string dengan encoding base64
            const stringFile = req.file.buffer.toString('base64');

            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            })

            return res.status(200).json({
                status: 'OK',
                message: 'Success',
                data : {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type : uploadFile.type
                }
            })
        } catch(err){
            throw err; 
        }
    }
}