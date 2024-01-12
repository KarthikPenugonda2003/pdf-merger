// FIX THIS

// To run localhost:3000 , type (nodemon server.js) in this terminal 
/* pdf merger not working... The first two files that are merged is the constant output.
ERROR PART : If we try to change the merging files, the output is still the same output as first output.
The "merged.pdf" file is displayed in uploads of D://pdf-merger 
The next step harry made some changes to redirect the output in the localhost itself.
ERROR PART : Here the server is getting crashed when i try to submit the files.
*/
/*ERROR PART : I tried to delete the first merged output file thinking a new output file will be
created but i was wrong. Maybe the submit is working for one time (maybe because of 'const').
*/
const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const {mergePdfs} = require('./merge')

const upload = multer( { dest : 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
    await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect("https://localhost:3000/static/merged.pdf")
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})