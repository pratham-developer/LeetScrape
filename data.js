const axios = require("axios");

const fetchLeetCodeData = async (username) => {
    const url = "https://leetcode.com/graphql/";
    const query = {
        query: `query getUserProfile($username: String!) {
            allQuestionsCount { difficulty count }
            matchedUser(username: $username) {
                contributions { points }
                profile { reputation ranking }
                submissionCalendar
                submitStats {
                    acSubmissionNum { difficulty count submissions }
                    totalSubmissionNum { difficulty count submissions }
                }
            }
        }`,
        variables: { username },
    };
    
    try {
        const { data } = await axios.post(url, query, {
            headers: {
                "Content-Type": "application/json",
                Referer: `https://leetcode.com/${username}/`,
            },
        });

        if (data.errors) {
            return { status: "error", message: "User does not exist" };
        }

        const userData = data.data.matchedUser;
        if (!userData) {
            return { status: "error", message: "User not found" };
        }

        const solvedStats = userData.submitStats?.acSubmissionNum || [];
        const totalStats = data.data.allQuestionsCount || [];

        const totalSolved = solvedStats.find(q => q.difficulty === "All")?.count || 0;
        const totalQuestions = totalStats.find(q => q.difficulty === "All")?.count || 0;
        const easySolved = solvedStats.find(q => q.difficulty === "Easy")?.count || 0;
        const totalEasy = totalStats.find(q => q.difficulty === "Easy")?.count || 0;
        const mediumSolved = solvedStats.find(q => q.difficulty === "Medium")?.count || 0;
        const totalMedium = totalStats.find(q => q.difficulty === "Medium")?.count || 0;
        const hardSolved = solvedStats.find(q => q.difficulty === "Hard")?.count || 0;
        const totalHard = totalStats.find(q => q.difficulty === "Hard")?.count || 0;

        // Updated Acceptance Rate Logic
        const totalAccepted = userData.submitStats?.acSubmissionNum[0]?.submissions || 0;
        const totalSubCount = userData.submitStats?.totalSubmissionNum[0]?.submissions || 1;

        let acceptanceRate = totalSubCount !== 0 ? (totalAccepted / totalSubCount) * 100 : 0;
        acceptanceRate = parseFloat(acceptanceRate.toFixed(2));

        return {
            status: "success",
            message: "retrieved",
            totalSolved,
            totalQuestions,
            easySolved,
            totalEasy,
            mediumSolved,
            totalMedium,
            hardSolved,
            totalHard,
            acceptanceRate,
            ranking: userData.profile?.ranking || 0,
            contributionPoints: userData.contributions?.points || 0,
            reputation: userData.profile?.reputation || 0,
            submissionCalendar: JSON.parse(userData.submissionCalendar || "{}"),
        };
    } catch (error) {
        return { status: "error", message: error.message };
    }
};

module.exports = fetchLeetCodeData;
