import User from "./models/user.js";
import token from "./createJWT.js";
import list from "./models/list.js";

function setApp (app, client) {

    app.post(
        "/api/login",
        async (req, res, next) => {

            // Incoming: login, password
            // outgoing: id, firstName, lastName, error

            const error = "",

                {login, password} = req.body,

                
                  const db = client.db();
                  const results = await db.collection('Users').findOne({
                      $and: [{Password: password},
                      {$or: [{Email: login}, {Login: login}]}]}
                  );
                 
                  var id = -1;  
                  var fn = '';  
                  var ln = '';
                  var un = '';  
                  var verStatus = 0;
                  if( results )  
                  {    
                      id = results._id;    
                      fn = results.FirstName;    
                      ln = results.LastName;
                      un = results.Login;
                      verStatus = results.AuthStatus;
                      if (verStatus == 0)
                      {
                          ret = {error:"Account not verified."};
                      }
                      else
                      {
                          try        
                          {          
                              const token = require("./createJWT.js");          
                              ret = token.createToken( fn, ln, un, id );        
                          }        
                          catch(e)        
                          {          
                              ret = {error:e.message};        
                          }  
                      }  
              
                  }      
                  else      
                  {          
                      ret = {error:"Login/Password incorrect."};      
                  }
                  res.status(200).json(ret);
              });

              app.post('/api/forgotpassword', async( req, res, next) =>
              {
                const {email} = req.body;
                const db = client.db();
                db.collection('Users').findOne({Email: email}, (err, user) =>
                {
                    if(err || !user)
                    {
                        return res.status(400).json({error:"Account with email does not exist."});
                    }

                    const jwtoken = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
                    // todo: do this as html
                    var message = "Hello, this is a password reset request for your Todo account! If you did not request this, please ignore. Reset your password here: https://cop4331-test123.herokuapp.com/";
                    message += jwtoken;
                    const checking = sendEmail.sendEmail(email, "Todo: Password Reset Request", message);

                    db.collection('Users').updateOne(
                        {_id:user._id},
                        {
                            $set: {resetPassword: jwtoken}  
                        }
                    );
            
                    return res.status(200).json({error: ""});

                })

            });

              app.post('/api/resetpassword', async( req, res, next) =>
              {
                  const {resetLink, newPassword} = req.body;
                  const db = client.db();
                  if(resetLink)
                  {
                      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(err, decodedData)
                      {
                          if(err)
                          {
                              return res.status(401).json({error:"Invalid token (either incorrect or expired)."});
                          }
                          db.collection('Users').findOne({resetPassword: resetLink}, (err, user) =>
                          {
                              if(err || !user)
                              {
                                  return res.status(400).json({error: "Invalid token."});
                              }
                              else
                              {
                                  db.collection('Users').updateOne(
                                      {_id:user._id},
                                      {
                                          $set: {Password: newPassword}
          
                                      }
                                  )
                                  return res.status(200).json({error: ""});
                              }
          
                          })
          
                      })
                  }
                  else
                  {
                      return res.status(401).json({error: "Authentication error."});
                  }
          
              });          

    // Create API.
    app.post(
        "/api/createNote",
        async (req, res, next) => {
            // test api for create

            // validate request
            if(!req.body)
            {
                res.status(400).send({message: "Note cannnot be empty!"});
            }

            // new Note
            const note = new Listsdb({
                Title: req.body.title,
                Body: req.body.note
            })

            // save note in the database
            .save(note)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:err.message || "Some error occured."
                });
            });
            const result = await client.db("Tododb").collection("lists").insertOne(newnote);

            console.log('New note created with the following id: ${result.insertId}');

        }
    ); 

    // Read API.
    app.get(

        "/api/read",
        async (req, res, next) => {
            // test api for read


            list.find()
            .then(list => {
                res.send(list)
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error finding note"})
            })


        }
    );

    // Update API.
    app.put(
        "/api/updateNote",
        async(req, res, next) => {
            // test api for update

            if(!req.body)
            {
                return res
                .status(400)
                .send({message: "Note to update can not be empty"})
            }

            const id = req.params.id;
            Tododb.findbyIdAndUpdate(id, req.body, {useFindAndModify : false})
            .then(data => {
                if(!data){
                    res.status(404).send({message: 'Cannot update Note with ${id}. Maybe note does not exist.'})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error updating note"})
            })

        }
    );

    // Delete API.
    app.post(
        "/api/delete",
        async (req, res, next) => {
            // test api for delete

            const noteId = req.params.id;

            tododb.findByIdAndDelete(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: 'Cant delete note with id ${id}. maybe id is wrong or note does not exist'})
                } else {
                    res.send({
                        message: "Note was deleted successfully."
                    })
                }
            })
            .catch(err =>{
                res.status(500).send({
                    message: "could not delete Note with id =" + noteId
               })
            });
        }
    );
    
}

export default {setApp};