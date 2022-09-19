//var bodyparser=require("body-parser");
//var urlencodedparser=bodyparser.urlencoded({extended: false});

// var mysql=require("mysql");
var mysql2=require("mysql2");
//var dotenv=require("dotenv").config()

var connection=mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "login"
});

connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected!");
  });

module.exports={
    registerPage: (req,res)=>{
        res.render("register")
    },

    checkRegister: (req,res)=>{
        var id=req.body.email
        var password=req.body.password
        console.log(req.body);

        connection.query('insert into users (uid,upass) values(?,?)', [id,password], function(error, results, fields){
            if(error){
                console.log(error);
                console.log(req.body);
                res.send("Something went wrong!!!")
            }
            else{
                res.send("Profile created successfully!!!")
                console.log(results);
            }
        })
    },

    loginPage: function(req,res){
        res.render("login")
    },

    checkLogin: (req,res)=>{
        // res.send("Logged in!!!")
        // console.log(req.body);
        // //res.send(req.body);

        var id=req.body.email;
        var password=req.body.password;

        connection.query("select * from users where uid=?", [id], function(error, results, fields){
            if(error)
            {
                res.send("Something went wrong!!!")
                console.log(error)
                console.log(req.body);
            }
            else if(results.length!=0)
            {
                console.log(results)
                var data=results[0]
                if(data.upass==password)
                {
                    res.send("Successfully Logged In!!!")
                }
                else{
                    res.send("Wrong Password!!!")
                }
            }
            else{
                res.send("Invalid User!!!, Try Again...")
            }
        })
    }
}