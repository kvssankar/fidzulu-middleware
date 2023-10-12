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

router.get("/all/team", async (req, res) => {
  res.json([
    {
      name: "Toy Service team",
      members: {
        member1: "Kinar",
        member2: "Vishakha",
        member3: "Jitin",
        member4: "krishna",
        member5: "Saundarya",
        member6: "Riddhi",
      },
    },
    {
      name: "Food Service team",
      members: {
        member1: "Kinar",
        member2: "Vishakha",
        member3: "Jitin",
        member4: "krishna",
        member5: "Saundarya",
        member6: "Riddhi",
      },
    },
    {
      name: "Toy Service team",
      members: {
        member1: "Kinar",
        member2: "Vishakha",
        member3: "Jitin",
        member4: "krishna",
        member5: "Saundarya",
        member6: "Riddhi",
      },
    },
    {
      name: "Middle Tier Class A",
      member: {
        member1: "Kvs Sankar Kumar",
        member2: "Srihari C",
        member3: "Isha Singh",
        member4: "Pranjal Surana",
      },
    },
    {
      name: "Middle Tier Class B",
      member: {
        member1: "Harishankar V",
        member2: "Sai Amith T",
        member3: "Swaroop S Jadhav",
        member4: "Srilakshman S",
      },
    },
  ]);
});

module.exports = router;
