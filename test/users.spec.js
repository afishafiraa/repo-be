//unit testing

const base = require('../app/controller/api/users');
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

//get user test
describe("users.get function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest()
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "success",
                code : 200,
                message : "Success!",
                data : expect.any(Array)
                
            })
        )
    })
    test("res.json called with page users data", async () => {
        const req = mockRequest({}, {
            page : 3
        })
        const res = mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "success",
                code : 200,
                message : "Success!",
                
            })
        )
    })
})

describe("users.getById function", () => {
    test("res.json called with users data", async () => {
        const req = mockRequest({
            id : 11
        })
        const res = mockResponse()
        await base.getById(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: "success",
                code : 200,
                message : "Success!",
                data : expect.any(Object)  
            })
        )
    })
})

// describe("users.update function", () => {
//     test("res.json called with accounts data", async () => {
//         const req = mockRequest({
//             id : 3,
//             data : {
//                 name : "Lalisa",
//                 email : "lalisa@123.com",
//                 password : "12345"
//             }
//         })
//         const res = mockResponse()
//         await base.update(req, res)
//         expect(res.status).toBeCalledWith(200)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: "success",
//                 code : 200,
//                 message : "Data diubah!",
//                 data : expect.any(Array)
                
//             })
//         )
//     }) 
// })
    
// describe("users.destroy function", () => {
//     test("res.json called with accounts data", async () => {
//         const req = mockRequest({
//             id : 23
//         })
//         const res = mockResponse()
//         await base.destroy(req, res)
//         expect(res.status).toBeCalledWith(200)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: "success",
//                 code : 200,
//                 message : "Data terhapus!"
                
//             })
//         )
//     })
// })

describe("users.create function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({
            name : "bunda",
            email : "bunda@123.com",
            password : "1234",
        })
        const res = mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                code : 201,
                status: "success",
                message : "Data ditambahkan",
                data : expect.any(Object),
            })
        )
    })
})