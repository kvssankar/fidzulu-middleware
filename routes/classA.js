const axios = require("axios");
const { ROUTE_MAP } = require("../constants/routemap");
const router = require("express").Router();

router.get("/:servicename/all/:location", async (req, res) => {
  const servicename = req.params.servicename;
  try {
    const url = `${ROUTE_MAP[servicename]}/${req.params.location}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data || { message: "Internal Server Error" };
    res.status(status).json(data);
  }
});



module.exports = router;
