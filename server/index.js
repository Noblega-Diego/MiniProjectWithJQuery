const express = require('express');
const app = express();

let PORT = 3000;

let users = [
    {
        name:'diego',
        lastname:'boca',
        email:'example4300@gmail.com',
        password:'cocacola24'
    },
    {
        name:'martin',
        lastname:'fierra',
        email:'example84@gmail.com',
        password:'pepsi'
    }
];

const isExistUser = (user) => {
    let isExist = false;
    users.forEach(iterUser => {
        if(iterUser.email === user.email)
            isExist = true;
    });
    return isExist;
}
//middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());

app.use(express.static('public'));

//rutas

app.use('/', express.static('public'));

app.get('/',(req, res, next) => {
    res.redirect('/register');
});

app.get('/api/users', (req, res, next) => {
    sendObject = (status,object)=>{ res.status(status).send(JSON.stringify(object)) }
    let listUser = users.map( (u)=>{ 
        return {
            name: u.name,
            lastname: u.lastname,
            email: u.email
        };
    });
    sendObject(200, listUser);
});

app.post('/api/register', (req, res, next) => {
    sendObject = (status,object)=>{ res.status(status).send(JSON.stringify(object)) }

    let body = req.body;
    let newUser= {
        name : null,
        lastname: null,
        email: null,
        password: null
    };
    if(body.name)
        newUser.name= body.name;
    else {sendObject(400,{error:'name is invalid'}); return}
    if(body.lastname)
        newUser.lastname= body.lastname;
    else {sendObject(400,{error:'lastname is invalid'}); return}
    if(body.email)  
        newUser.email= body.email;
    else {sendObject(400,{error:'email is invalid'}); return}
    if(body.password) 
        newUser.password= body.password;
    else {sendObject(400,{error:'password is invalid'}); return}

    if(!isExistUser(newUser)){
        users.push(newUser);
        sendObject(201, {
            response:'OK'
        })
    }else{
        sendObject(400,{error:'a user with this email already exists', info:newUser.email})
    }
});

app.listen(PORT, ()=>{
    console.log('server listen in port ' + PORT);
});
