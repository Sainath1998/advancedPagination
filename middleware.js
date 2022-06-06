const express = require('express')

exports.paginated = function(model){
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