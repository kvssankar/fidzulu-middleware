const axios = require("axios");
const nock = require("nock");
const base_url = 'http://localhost:3031/bikes/all';

describe("Bikes Mid End Tests", () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    it("returns a 404 status code", async () => {
        const location = "/bikes/Pizza";
        nock(base_url).get(location).reply(404);    
        try {
            const response = await axios.get(base_url + location);
            expect(response.status).toBe(404);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
    

    it("returns a 200 status code", async () => {
        const location = "/bikes/Durham";
        nock(base_url).get(location).reply(200, {
            data: {
                "name": "Mamba Sport 12\" Balance Bike",
                "brand": "Mamba Bikes",
                "color": "black",
                "price": 75.88
            }
        });
        const response = await axios.get(base_url + location);
        expect(response.status).toBe(200);
    });

    it("returns Mamba Bikes", async () => {
        const location = "/bikes/Durham";    
        nock(base_url).get(location).reply(200, [
            {
                "name": "Mamba Sport 12\" Balance Bike",
                "brand": "Mamba Bikes",
                "color": "black",
                "price": 75.88
            }
        ]);
        const response = await axios.get(base_url + location);
        expect(response.data).toBeTruthy();
        expect(response.data[0]).toHaveProperty("brand", "Mamba Bikes");
    });

    it("handles server error (500 status code)", async () => {
        const location = "/bikes/ServerError";    
        nock(base_url).get(location).reply(500);    
        try {
            await axios.get(base_url + location);
            fail("Expected an error for a 500 status code.");
        } catch (error) {
            expect(error.response.status).toBe(500);
        }
    });

    it("handles request timeout", async () => {
        const location = "/bikes/Timeout";
        nock(base_url).get(location).delayConnection(2000).reply(200, {});    
        try {
            await axios.get(base_url + location, { timeout: 1000 });
            fail("Expected a timeout error.");
        } catch (error) {
            expect(error.code).toBe("ECONNABORTED");
        }
    });

    it("handles network error", async () => {
        const location = "/bikes/NetworkError";
        nock(base_url).get(location).replyWithError("Network Error");    
        try {
            await axios.get(base_url + location);
            fail("Expected a network error.");
        } catch (error) {
            expect(error.message).toContain("Network Error");
        }
    });

    it("handles invalid URL", async () => {
        const invalidUrl = "htp://invalidurl:3001/bikes/Durham";    
        try {
            await axios.get(invalidUrl);
            fail("Expected an error for an invalid URL.");
        } catch (error) {
            expect(error.message).toContain("Unsupported protocol htp:");
        }
    });

    it("handles a large response", async () => {
        const location = "/bikes/LargeResponse";
        const largeData = [...Array(1e6).keys()];    
        nock(base_url).get(location).reply(200, largeData);
        const response = await axios.get(base_url + location)    
        expect(response.status).toBe(200);
        expect(response.data).toEqual(largeData);
    });
    
});