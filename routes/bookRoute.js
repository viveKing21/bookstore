const { bookModel } = require('../model/book')
const exxpress = require('express')
const bookRoute = exxpress.Router()

bookRoute.post('/', async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body;
        const book = new bookModel({title, author, genre, description, price})
        await book.save()
        res.status(201).json({msg:'Book Added!'})
    }catch(err){
        res.status(500).json({error:'Book Not Added!'})
    }
})

bookRoute.get('/', async(req,res)=>{
   try{
    const {sortBy, genre} = req.query;
    const query = {}
    if(genre){
            query.genre = genre
    }

    const sortingOp = {}
    if(sortBy == 'asc'){
        sortingOp.price = 1
    }else if(sortBy == 'desc'){
        sortingOp.price = -1
    }
    const book = await bookModel.find(query).sort(sortingOp)
    res.status(200).json(book)
   }catch(err){
    res.status(500).json({error:'Book Not Found!'})
   }
})



bookRoute.delete('/:id', async(req, res)=>{
    const {id} = req.params
    try{
        await bookModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:'Book Deleted'})
    }catch(err){
        res.status(500).json({error:'Unable to Delete Book'})
    }
})

module.exports = {bookRoute}