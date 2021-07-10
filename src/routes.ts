import app from './app'
var jwt = require("jwt-simple");
import { post as createQuestion, put as updateQuestion, remove as deleteQuestion, getOne as getQuestion, getAll as getQuestions,validateQuestion as validateQuestion } from "./controllers/question";
import { post as createCategory, put as updateCategory, remove as deleteCategory, getOne as getCategory, getAll as getCategories } from "./controllers/category";
import { post as createUser,getAll as getUser,getToken as getToken } from "./controllers/user";
import passport from 'passport';
var auth = require("./auth.js")();

app.get('/', (req, res) => {
    res.send("Hello, This is a quiz app")
});

// protected routes
app.post('/category',auth.authenticate(), createCategory);
app.get('/category', auth.authenticate(),getCategories);
app.get('/category/:id',auth.authenticate(), getCategory);
app.put('/category/:id', auth.authenticate(),updateCategory);
app.delete('/category/:id', auth.authenticate(),deleteCategory);

app.post('/question',auth.authenticate(), createQuestion);
app.get('/question',auth.authenticate(), getQuestions);
app.get('/question/:id', auth.authenticate(),getQuestion);
app.put('/question/:id', auth.authenticate(),updateQuestion);
app.delete('/question/:id',auth.authenticate(), deleteQuestion);
app.post('/question/validate',auth.authenticate(), validateQuestion);

app.post('/user', createUser);
app.get('/user', getUser);
app.post("/token", getToken);



