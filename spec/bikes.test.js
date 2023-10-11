const axios = require("axios");
const nock = require("nock");
const base_url = 'http://localhost:3001';

describe("Bikes Mid End Tests", () => {
    beforeEach(() => {
        // Before each test, clear any registered nock interceptors
        nock.cleanAll();
    });

    it("returns a 404 status code", async () => {
        const location = "/bikes/Pizza";
    
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
    
});
