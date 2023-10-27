const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {

    async create(req, res){
        const profile = await prisma.profile.create({
            data: req.body
        });

        console.log(profile);

        res.status(201).json({
            status : 'success',
            code : 201,
            message : 'Data ditambahkan',
            data : profile
        })
    },
}