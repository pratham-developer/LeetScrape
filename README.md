# 📌 LeetScrape API

LeetScrape is a lightweight API that fetches LeetCode user statistics. This API allows you to retrieve various details about a LeetCode user, including solved question counts, acceptance rate, ranking, and submission history.

## 🚀 Deployment

This API is deployed on Vercel. You can access it via the following base URL:

```
https://leet-scrape.vercel.app/
```

## 📖 Usage

To use this API, append the desired endpoint to the base URL along with the LeetCode username.

### **Available Endpoints:**

- `/:username` → Fetch full user data
- `/:username/solvedCount` → Get solved question counts (Easy, Medium, Hard)
- `/:username/questionCount` → Get total question counts per difficulty level
- `/:username/profile` → Fetch ranking, contribution points, and reputation
- `/:username/acceptanceRate` → Get the acceptance rate
- `/:username/submissions` → Retrieve submission calendar

🔹 **Example Request:**
```
GET https://leet-scrape.vercel.app/saypratham
```

