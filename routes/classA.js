const axios = require("axios");
const { ROUTE_MAP, ROUTE_MAP_TEAMS } = require("../constants/routemap");
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

router.get("/:servicename/team", async (req, res) => {
  const servicename = req.params.servicename;
  try {
    const url = `${ROUTE_MAP_TEAMS[servicename]}`;
    console.log(url);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data || { message: "Internal Server Error" };
    res.status(status).json(data);
  }
});



module.exports = router;
