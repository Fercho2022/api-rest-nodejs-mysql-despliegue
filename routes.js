const express= require('express')
const routes= express.Router()


routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('SELECT * FROM books', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    console.log(req.body)
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('INSERT INTO books set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send('el libro ha sido insertado')
        })
    })
})

routes.delete('/:id', (req, res)=>{
   
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('DELETE FROM books WHERE id=  ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.send('el libro ha sido eliminado')
        })
    })
})

routes.put('/:id', (req, res)=>{
   
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('UPDATE books set ? WHERE id=  ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.send('el libro ha sido actualizado')
        })
    })
})

module.exports = routes