import express from 'express';
import path from 'path';
import router from './routes';
import cookieParser from 'cookie-parser';

const app = express();

app.set('views', path.join(__dirname, 'public/ejs/'));

app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/pictionary', router);

app.use('*', function(req, res){
    res.render('404.ejs');
})

export default app;
