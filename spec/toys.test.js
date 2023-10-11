const axios = require("axios");
const nock = require("nock");
const base_url = 'http://localhost:3001';

describe("Bikes Mid End Tests", () => {
    beforeEach(() => {
        // Before each test, clear any registered nock interceptors
        nock.cleanAll();
    });

    it("returns a 404 status code", async () => {
        const location = "/toys/NewToy";
    
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

    it("returns Mamba Bikes", async () => {
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
    
});
