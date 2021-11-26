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
        // read a list in the database
        // should respond with a 200 status and return the list


    })
    describe("update the list", () => {
        // updates the list in the database
        // should respond with a 200 status and update the list
    })

    describe("deletes the list", () => {
        // deletes the list from the database
        // should respond with a 200 status and deletes the list
        
    })
})