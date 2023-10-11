const axios = require("axios");
const nock = require("nock");
const base_url = 'http://localhost:3001';

describe("Toys Mid End Tests", () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    it("returns a 404 status code", async () => {
        const location = "/toys/NewToy";
        nock(base_url).get(location).reply(404);    
        try {
            const response = await axios.get(base_url + location);
            expect(response.status).toBe(404);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
    

    it("returns a 200 status code", async () => {
        const location = "/toys/Durham";

        nock(base_url).get(location).reply(200, {
            data: {
                "name": "Medical Kit",
                "brand": "Fisher-Price",
                "age-group": "3 to 9",
                "prize": 20.41
              }
        });

        const response = await axios.get(base_url + location);

        expect(response.status).toBe(200);
    });

    it("returns Fisher-Price toys", async () => {
        const location = "/toys/Durham";    
        nock(base_url).get(location).reply(200, [
            {
                "name": "Medical Kit",
                "brand": "Fisher-Price",
                "age-group": "3 to 9",
                "prize": 20.41
              }
        ]);    
        const response = await axios.get(base_url + location);    
        expect(response.data).toBeTruthy();
        expect(response.data[0]).toHaveProperty("brand", "Fisher-Price");
    });

    it("handles server error (500 status code)", async () => {
        const location = "/toys/ServerError";    
        nock(base_url).get(location).reply(500);    
        try {
            await axios.get(base_url + location);
            fail("Expected an error for a 500 status code.");
        } catch (error) {
            expect(error.response.status).toBe(500);
        }
    });
    
    it("handles request timeout", async () => {
        const location = "/toys/Timeout";
        nock(base_url).get(location).delayConnection(2000).reply(200, {});    
        try {
            await axios.get(base_url + location, { timeout: 1000 });
            fail("Expected a timeout error.");
        } catch (error) {
            expect(error.code).toBe("ECONNABORTED");
        }
    });

    it("handles network error", async () => {
        const location = "/toys/NetworkError";
        nock(base_url).get(location).replyWithError("Network Error");    
        try {
            await axios.get(base_url + location);
            fail("Expected a network error.");
        } catch (error) {
            expect(error.message).toContain("Network Error");
        }
    });
    
    it("handles invalid URL", async () => {
        const invalidUrl = "htp://invalidurl:3001/toys/Durham";    
        try {
            await axios.get(invalidUrl);
            fail("Expected an error for an invalid URL.");
        } catch (error) {
            expect(error.message).toContain("Unsupported protocol htp:");
        }
    });

    it("handles a large response", async () => {
        const location = "/toys/LargeResponse";
        const largeData = [...Array(1e6).keys()];    
        nock(base_url).get(location).reply(200, largeData);
        const response = await axios.get(base_url + location)    
        expect(response.status).toBe(200);
        expect(response.data).toEqual(largeData);
    });
     
});