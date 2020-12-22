const googleTrends = require('google-trends-api');
const express = require('express')

const app = express()
app.set('json spaces', 2)

async function daily(country) {
    let result = await googleTrends.dailyTrends({geo: country})
    return result;
}

app.get("/daily/:country", async (req, res) => {
    let result = await daily(req.params.country);
    res.type('json');
    res.send(result)
});

app.listen(5001)