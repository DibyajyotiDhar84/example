const express = require('express');
const mysql = require('mysql2');//my sql 
const cors =require('cors');
const jwt =require('jsonwebtoken');
const { checkSchema } = require('express-validator');

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root1",
    database:"employeedb"
});

conn.connect(err=>{
    if(err){
        console.log("this is error");
        console.log(err);
        
    }else{
        console.log("helloo");
        
    }
})

let app = express();
 
app.use(express.json());
app.use(express.urlencoded({express:true}));
app.use(cors({origin:"*"}));
 
app.listen(8056,()=>{
    console.log('server listens on 8056')
})
 
app.get("/allEmp",(req,res)=>{
 
    conn.query("select * from empployee", (err,result)=>{
        setTimeout(()=>{
            res.status(200).json(result);
        },3000)
    })
})

app.post("/register",(req,res)=>{
    let {id,name,salary}=req.body;
    conn.query("insert into empployee values(?,?,?)",[id,name,salary],(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({status:false})
            
        }else{
            res.status(201).json({status:true})
        }
    })
})

app.post("/authenticate",(req,res)=>{
    let {name ,password}=req.body;

    conn.query("select password from user where name=?",[name],(error,result)=>{
        if(error){
            console.log(error);
            res.status(404).json({status:false});
            
        }else{

            if(result[0]!=null && result[0].password==password){

                console.log(result);    
                res.status(200).json({status:true});
            }else{
                res.status(404).json({status:false});

            }
            
        }
    })
})

app.delete("/deleteEmp/:id",(req,res)=>{
    let {id}=req.params;
    conn.query("delete from empployee where id=?",[id],(err,result)=>{
        console.log(id);
        if(err){
            console.log(err);
            res.status(400).json({status:"error"});
            
        }else{
            if(result.affectedRows){
                console.log(result);
                res.status(200).json({status:"Deleted"});
            }else{
                console.log(result);
                res.status(400).json({status:"notFound"});
            }
            
            
        }
    })
})

app.put("/updateEmp/:id",(req,res)=>{
    let{id}=req.params
    let {name,salary,age}=req.body;
    console.log(name,salary,age);
    

    conn.query("update empployee set name=?,salary=?,age=? where id=?",[name,salary,age,id],(err,result)=>{
        if(err){
            console.log(err);
            res.status(400).json({status:false})
            
        }else{
            console.log(result);
            
            if(result.affectedRows){
                res.status(200).json({status:true})
            }else{
                 res.status(400).json({status:false})
            }
        }
    })
});

app.get('/checkname/:name',(req,res)=>{
    let {name}=req.params;
    conn.query('select count(name) as count from empployee where name=?',[name],(err,result)=>{
        res.status(200).json(result[0]);
    })
});
app.get('/search/:id',(req,res)=>{
    let{id}=req.params;
    conn.query('SELECT * FROM empployee WHERE id=?',[id],(err,result)=>{
         setTimeout(()=>{
            res.status(200).json(result);
        },1000)
    })
});

app.get('/allStates',(req,res)=>{
    conn.query('SELECT * FROM states',(err,result)=>{

        setTimeout(()=>{
            res.status(200).json(result);
        },1000)
    });
});

app.get('/allCities/:sid',(req,res)=>{
    const{sid}=req.params;
    conn.query('SELECT * FROM cities WHERE sid=?',[sid],(err,result)=>{
        setTimeout(()=>{
            res.status(200).json(result);
        },1000)
    })
});

app.post('/isssvalid',checkSchema,(req,res)=>{


});


 