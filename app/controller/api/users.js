// const model = require('../../../model/users')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    async get(req, res){
        const { search, page, limit } = req.query;
        console.log(req.query);

        let result = await prisma.user.findMany({
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

    async getById(req, res){
        if(!req.params.id) return res.status(400).json({
            status: 'fail',
            code: 400,
            message: 'Bad request! id is required'
        })
        
        const user = await prisma.user.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        if(!user){
            return res.status(200).json({
                status : 'success',
                code : 200,
                message : 'Data Empty!',
            })
        }

        return res.status(200).json({
            status : 'success',
            code : 200,
            message : 'Success!',
            data : user
        })
    },
    async create(req, res){
        // const { email, name, password, profile } = req.body

        const user = await prisma.user.create({
            data : req.body
        });

        console.log(user);

        res.status(201).json({
            status : 'success',
            code : 201,
            message : 'Data ditambahkan',
            data : user
        })
    },
    async update(req, res){
        const { name, email, password } = req.body
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name,
                email,
                password,
            },
        })
    
        res.status(200).json({
            status : 'success',
            code : 200,
            message : 'Data diubah!',
            data : user
        })  
    },
    async destroy(req, res){
        if(!req.params.id) res.status(400).json({
            status: 'fail',
            code: 400,
            message: 'Bad request! id is required'
        })
    
        const user = await prisma.user.delete({
            where: {
                id : Number(req.params.id)
            }
        });
    
        res.status(200).json({
            status : 'success',
            code : 200,
            message : 'Data terhapus!'
        })
    },
    async getProfile(req, res){
        if(!req.params.id) return res.status(400).json({
            status: 'fail',
            code: 400,
            message: 'Bad request! id is required'
        })
        
        const user = await prisma.user.findMany({
            include: {
                profile: true,
            },
            where: {
                id : Number(req.params.id)
            }
        });

        return res.status(200).json({
            status : 'success',
            code : 200,
            message : 'Success!',
            data : user
        })
    }
}