const express = require('express');
const app = express();
const upload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
app.set('view engine', 'ejs');
app.use(upload());
app.use(express.static('./uploads'));

app.get('/', (req, res) => {
    const dirPath = path.join(__dirname + '/uploads');
    const readFile = fs.readdirSync(dirPath);
    res.render('index', {
        files: readFile
    });
});

app.post('/api/upload', (req, res) => {
    if(req.files) {
        const file = req.files.file;
        file.mv('./uploads/' + file.name, (err) => {
            if(err) {
                res.send(500);
            } else {
                res.redirect(`/${file.name}`);
            }
        });
    } else {
        res.send(500)
    }
});

app.get('/api/deletefile', (req, res) => {
        if(req.query.filename) {
            const dirPath = path.join(__dirname + '/uploads/');
            fs.unlink(dirPath + req.query.filename, (err) => {
                if(err) {
                    res.send(err);
                } else {
                    res.redirect('/')
                }
            });
        } else {
            res.send(500);
        }
});

app.listen(3000, () => console.log('Online'));