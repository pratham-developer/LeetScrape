const express = require("express");
const fetchLeetCodeData = require("./data");

const router = express.Router();

// 📌 Common Route - Fetch Full Data

router.get("/", async (req,res)=>{
    res.send("Welcome To LeetScrape!");
});

router.get("/:username", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    res.json(data);
});

// 📌 Fetch Solved Question Counts
router.get("/:username/solvedCount", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    if (data.status === "error") return res.status(400).json(data);

    res.json({
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
    });
});

// 📌 Fetch Total Question Counts
router.get("/:username/questionCount", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    if (data.status === "error") return res.status(400).json(data);

    res.json({
        totalQuestions: data.totalQuestions,
        totalEasy: data.totalEasy,
        totalMedium: data.totalMedium,
        totalHard: data.totalHard,
    });
});

// 📌 Fetch User Profile Stats
router.get("/:username/profile", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    if (data.status === "error") return res.status(400).json(data);

    res.json({
        ranking: data.ranking,
        contributionPoints: data.contributionPoints,
        reputation: data.reputation,
    });
});

// 📌 Fetch Acceptance Rate
router.get("/:username/acceptanceRate", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    if (data.status === "error") return res.status(400).json(data);

    res.json({ acceptanceRate: data.acceptanceRate });
});

// 📌 Fetch Submission Calendar
router.get("/:username/submissions", async (req, res) => {
    const { username } = req.params;
    const data = await fetchLeetCodeData(username);
    if (data.status === "error") return res.status(400).json(data);

    res.json({ submissionCalendar: data.submissionCalendar });
});

module.exports = router;
