const googleTrends = require('google-trends-api');
const express = require('express')

const app = express()
app.set('json spaces', 2)

async function daily(country) {
    let result = await googleTrends.dailyTrends({geo: country, timezone: 0})
    return result;
}

app.get("/daily/:country", async (req, res) => {
    res.type('json');

    try {
        let resultBody = await daily(req.params.country);
        //console.log(`Got body ${resultBody}`)
        let result = JSON.parse(resultBody)
        
        res.send(result.default)
    } catch(err) {
        let message = `${err}`
        let errorPayload = {message: message}
        res.status(400)
        res.send(errorPayload)
    }
    
});

app.listen(5001)