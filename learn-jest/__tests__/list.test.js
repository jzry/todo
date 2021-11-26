import supertest from 'supertest'
import lists from './lists'

describe("POST /lists", () => {

    describe("Create a list", () => {
        // create a list in the database
        // should respond with a json object containing the list id
        // should respond with a 200 status code
        test("should respond with a 200 status code", () => {
            const response = await request(lists).post("/lists").send({
                UserId: "UserId",
                Title: "Title",
                Body: "Body"
            })
            expect(response.statusCode).toBe(200)
        })
    })

    describe("Read the list", () => {


    })
})