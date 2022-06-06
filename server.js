const express = require('express')
const res = require('express/lib/response')
const app = express()
const users = [
    {id:1, user:"user 1"},
    {id:2, user:"user 2"},
    {id:3, user:"user 3"},
    {id:4, user:"user 4"},
    {id:5, user:"user 5"},
    {id:6, user:"user 6"},
    {id:7, user:"user 7"},
    {id:8, user:"user 8"},
    {id:9, user:"user 9"},
    {id:10, user:"user 10"},
    {id:11, user:"user 11"},
    {id:12, user:"user 12"},
    {id:13, user:"user 13"},
    {id:14, user:"user 14"},
]

const posts = [
    {id:1, user:"post 1"},
    {id:2, user:"post 2"},
    {id:3, user:"post 3"},
    {id:4, user:"post 4"},
    {id:5, user:"post 5"},
    {id:6, user:"post 6"},
    {id:7, user:"post 7"},
    {id:8, user:"post 8"},
    {id:9, user:"post 9"},
    {id:10, user:"post 10"},
    {id:11, user:"post 11"},
    {id:12, user:"post 12"},
    {id:13, user:"post 13"},
    {id:14, user:"post 14"},
]
app.get('/users',paginated(users),(req, res)=>{
    res.json(res.paginatedResult)
})
app.get('/posts',paginated(posts),(req, res)=>{
    res.json(res.paginatedResult)
})
app.get('*',(req, res)=>{
    res.send('ERROR 404 Page notfound')
})


function paginated(model){
   return(req, res, next)=>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = (page) * limit
    const results = {}
    if(endIndex<model.length){
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if(startIndex>0){
        results.prev = {
            page : page - 1,
            limit : limit
        }
    }
    results.userResult = model.slice(startIndex,endIndex)
    res.paginatedResult = results
    next()
   }
    
}


app.listen(3000,()=>{
    console.log('The app is running on port number 3000')
})