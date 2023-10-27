const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res){
        const { search, page, limit } = req.query;
        console.log(req.query);

        let result = await prisma.transaction.findMany({
                orderBy:{
                    id : 'asc',
                },
            },
            search, page, limit)
        if(!result.length) {
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Data empty'
            })
        }   

        return res.status(200).json({
            status : 'success',
            code : 200,
            message : 'Success!',
            data : result
        })
    },
    async create(req, res){
        const profile = await prisma.transaction.create({
            data: req.body
        }); 

        // console.log(profile);

        res.status(201).json({
            status : 'success',
            code : 201,
            message : 'Data ditambahkan',
            data : profile
        })
    },
}