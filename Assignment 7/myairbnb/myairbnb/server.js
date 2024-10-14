const express= require('express')
const cors= require('cors')
const jwt= require('jsonwebtoken')
const config= require('../myairbnb/config')
const utils= require('../myairbnb/utils')

const app= express()
app.use(cors())
app.use(express.json())     

//middleware to verify the token

app.use((request, response, next) =>{
    //check if token is required for the api
    if(
        request.url==='/user/login' || 
        request.url==='/user/register' ||
        request.url.startsWith('/image/')
    ){
        
        next()
    } else{
        // console.log("no token available")/
        // get the token
        const authtoken = request.headers.authorization;
        const token = authtoken.split(' ')[1];
        console.log("$ ", token);
        //const token = request.headers["token"]
        
        if(!token  || token.length === 0)
        {
            response.send(utils.createErrorResult("missing token"))
        }

        else
        {
            try{
                // verify the token

            const payload = jwt.verify(token, config.secret)
             console.log("##", payload['id'])
            // add the userid to the request
            request.userid = payload['id']  
            console.log("**", request.userid)

            // TODO: expiry logic

            //call the real route
            next()
        }
           catch(ex)
           {
            response.send(utils.createErrorResult('invalid token'))
           }

        }
        
    }
})

//add the routes

const userRouter=require('./routes/user')
const categoryRouter = require('./routes/category')
const imageRouter = require('./routes/image')
const propertyRouter =  require('./routes/property')
const bookingRouter = require('./routes/booking')


app.use('/user',userRouter)
app.use('/category', categoryRouter)
app.use('/image', imageRouter)
app.use('/property',propertyRouter)
app.use('/booking',bookingRouter)

app.listen(4000, '0.0.0.0', ()=>{
    console.log(`server started on port 4000`)
})