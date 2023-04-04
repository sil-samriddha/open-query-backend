import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())


// Configure
const configuration = new Configuration({
    organization: "org-5d5ojcAOKgoWhCgNjBYV7hsV",
    apiKey: "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"
})
const openai = new OpenAIApi(configuration)

const port = 4000
// listeninng
app.listen(port, ()=>console.log(`listening on port ${port}`))


// dummy route
app.get("/", (req, res) => {
    res.send(`Server is running on port : ${port}`)
})


//post rout
app.post('/', async (req, res)=>{
    const {message} = req.body;
    try{
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: `${message}`},
            ]
        })
        res.json({message: response.data.choices[0].message.content})

    }catch(e){
        console.log(e)
        res.json({message: "\n\nWe apologize for the inconvenience, but our server is currently experiencing a high volume of traffic, which may cause delays in accessing our website or services. Our team is actively working to resolve this issue and improve server performance to provide you with the best possible experience.\n"+ e})
    }
})