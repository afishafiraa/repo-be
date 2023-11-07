//unit testing

const base = require('../app/controller/api/profiles');
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

//get user test
describe("profiles.get function", () => {
    test("res.json called with profiles data", async () => {
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
    test("res.json called with page profiles data", async () => {
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
describe("profiles.create function", () => {
    test("res.json called with status 201", async () => {
        const req = mockRequest({
            identify_type : "SIM",
            identify_number : "6543217889",
            address : "Jogja",
            userId : 11
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
