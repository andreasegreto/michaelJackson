const express=require("express");
const app= express();
const port = process.env.PORT;
const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: "2bd3276841d2d931a2775dc675cf2a90-us21",
  server: "us21",
});
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))



app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
    });


app.post("/", function(req,res){

const listId = "0f5a9bef85";
const subscribingUser = {
  firstName: req.body.name,
  lastName: req.body.surname,
  email: req.body.email
};

async function run() {
    try{
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
  res.sendFile(__dirname + "/success.html")}
  catch (e) {
    res.sendFile(__dirname + "/failure.html");
}
}


run();
});

app.post("/failure.html", function(req, res) {
    res.redirect("/");
  })










app.listen(port || 3000, function () {
    console.log("server is workin on 30000000000000")
})



//2bd3276841d2d931a2775dc675cf2a90-us21

/*djsfhfosjfdfs*/
