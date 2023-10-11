const axios = require("axios");
const nock = require("nock");

const base_url = 'http://localhost:3032/foodService/all';
const post_url = "/food/add";

describe("Food Mid End Tests", () => {
    describe("GET /food/<location>", () => {
        it("returns a 404 status code", async () => {
            let location = "/food/invalid";        
            nock(base_url).get(location).reply(404);
        try {
            const response = await axios.get(base_url + location);
            expect(response.status).toBe(404);
        } catch (error) {
            // If the request fails, the error object should contain the 404 status
            expect(error.response.status).toBe(404);
        }
        });

        it("returns a 200 status code", async () => {
            let location = "/food/Durham";
            nock(base_url).get(location).reply(200, {
                data: {
                    "name": "The Original Sandwich",
                    "brand": "Oreo",
                    "weight": "303g",
                    "calories": 405,
                    "price": 2.85
                }
            });
            const response = await axios.get(base_url + location);
            expect(response.status).toBe(200);
        });

        it("returns 'The Original Sandwich'", async () => {
            let location = "/food/Durham";
            nock(base_url).get(location).reply(200, {
                data: {
                    "name": "The Original Sandwich",
                    "brand": "Oreo",
                    "weight": "303g",
                    "calories": 405,
                    "price": 2.85
                }
            });
            const response = await axios.get(base_url + location);
            expect(response.data).toBeTruthy();
            expect(response.data.data.name).toBe("The Original Sandwich");
        });
    });

    describe("GET /food/teams", () => {
        it("returns a 200 status code", async () => {
            let path = "/food/teams";

            nock(base_url).get(path).reply(200, {
                data: {
                    "team" : "Mid-End",
                    "names" : "Simon Hayes"
                }
            });

            const response = await axios.get(base_url + path);

            expect(response.status).toBe(200);
        });

        it("returns 'Simon Hayes'", async () => {
            let path = "/food/teams";
            nock(base_url).get(path).reply(200, {
                data: {
                    "team" : "Mid-End",
                    "names" : "Simon Hayes"
                }
            });
            const response = await axios.get(base_url + path);
            expect(response.data).toBeTruthy();
            expect(response.data.data.names).toBe("Simon Hayes");
        });
    });

    // describe("POST /food/add", () => {
    //     it("returns a 404 status code", async () => {
    //         nock(base_url).post(post_url).reply(404);

    //         const response = await axios.post(base_url + post_url);

    //         expect(response.status).toBe(404);
    //     });

    //     it("returns a 200 status code", async () => {
    //         let food = {
    //             "name": "The Original Sandwich",
    //             "brand": "Oreo",
    //             "weight": "303g",
    //             "calories": 405,
    //             "price": 2.85
    //         };

    //         let foodJSON = JSON.stringify(food);

    //         nock(base_url)
    //             .post(post_url, foodJSON)
    //             .reply(200, {
    //                 id: 123456
    //             });

    //         const response = await axios.post(base_url + post_url, foodJSON);

    //         expect(response.status).toBe(200);
    //     });

    //     it("returns id on successful add", async () => {
    //         let food = {
    //             "name": "The Original Sandwich",
    //             "brand": "Oreo",
    //             "weight": "303g",
    //             "calories": 405,
    //             "price": 2.85
    //         };

    //         let foodJSON = JSON.stringify(food);

    //         nock(base_url)
    //             .post(post_url, foodJSON)
    //             .reply(200, {
    //                 id: 123456
    //             });

    //         const response = await axios.post(base_url + post_url, foodJSON);

    //         expect(response.data).toBeTruthy();
    //         expect(response.data.id).toBe(123456);
    //     });
    // });

    it("handles server error (500 status code)", async () => {
        const location = "/food/ServerError";    
        nock(base_url).get(location).reply(500);    
        try {
            await axios.get(base_url + location);
            fail("Expected an error for a 500 status code.");
        } catch (error) {
            expect(error.response.status).toBe(500);
        }
    });
    
    it("handles request timeout", async () => {
        const location = "/food/Timeout";
        nock(base_url).get(location).delayConnection(2000).reply(200, {});    
        try {
            await axios.get(base_url + location, { timeout: 1000 });
            fail("Expected a timeout error.");
        } catch (error) {
            expect(error.code).toBe("ECONNABORTED");
        }
    });

    it("handles network error", async () => {
        const location = "/food/NetworkError";
        nock(base_url).get(location).replyWithError("Network Error");    
        try {
            await axios.get(base_url + location);
            fail("Expected a network error.");
        } catch (error) {
            expect(error.message).toContain("Network Error");
        }
    });
    
    it("handles invalid URL", async () => {
        const invalidUrl = "htp://invalidurl:3001/food/Durham";    
        try {
            await axios.get(invalidUrl);
            fail("Expected an error for an invalid URL.");
        } catch (error) {
            expect(error.message).toContain("Unsupported protocol htp:");
        }
    });

    it("handles a large response", async () => {
        const location = "/food/LargeResponse";
        const largeData = [...Array(1e6).keys()];    
        nock(base_url).get(location).reply(200, largeData);
        const response = await axios.get(base_url + location)    
        expect(response.status).toBe(200);
        expect(response.data).toEqual(largeData);
    });

});