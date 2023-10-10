const axios = require("axios");
const { ROUTE_MAP } = require("../constants/routemap");
const router = require("express").Router();

router.get("/:servicename/all/location", async (req, res) => {
  const servicename = req.params.servicename;
  try {
    const response = await axios.get(ROUTE_MAP[servicename] + "/all/location");
    res.json(response.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
});

module.exports = router;
