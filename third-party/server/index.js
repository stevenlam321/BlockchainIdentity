const express = require('express')
const http = require('http')
const app = express();
const bodyParser = require('body-parser')
const server = http.createServer(app);
const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

app.post('/data', (req, res) => {
    const keyString = fs.readFileSync(path.join(__dirname, './keys/app'),'utf8');
    const privateKey = new NodeRSA(keyString);
   // console.log(req.body.data);
    try{
       // var encryptedData = 'wq';
        // const data = req.body.data;
      //  var encryptedData = 'apt29QfX8Z9hBgHEEiGzJm0YiqYZ/7PH/7JGyyNvhKq6rJynSEMRQSyn+FQsRsMQ9olGdyo5PGSVQ+4lmKjyCpDnUc+EXFgtOcB/SagX2nQqcvTh90DdIJdUB6RrN/x4k7TswZrSb8MYxp1t9pnMrwOZVBUkED5g20ev0E2NO6tcHgmVwTHkFRp9xGVxfLKucHPolpOZginHVEfkdUDnfpQ/kuoBrfyEip/VPTQGW2159qlUkkqH6EjZT0rNYblparjf1LQN2YGDnRy8ZSt9zMBDQHJcvP0gAvg+86pLT72iYdXt2T3FwISBj15B5WOUxVghxkkr1MULLOzadKyUFg0O3csOVdsABnN01iXj5dXaSblhTXikzX3achLsSWd/w88XW7UgzH71hviuCEQFuVuP2p6lEmilUW5TuMdFweJyhVUv9KtQBBdOqyTaH6KwAgWf5P4wsuiA/zQAsUUvGBz1/6WsbPLLBdyTDMl3bbBVafwPpCKfUjsAYhYmbHzDqLF6f2K5W/Xdsra7VZ8zthq2YsadeXdYLBdqr9E7k6+ljZk+DHvJIRluXIglt3zINfrTCoZLK1XEkubiYhPMVcjKbRWF9+bPdOHmQEX94grrscooBRAB7I7RwDXOj6lJXTElK7kLtxU028AOcKTqg6PxVQbKvpuFLm9b7VQ9gVE/bNNa9RyVRKzVbguVhMDbeDr/B2m5MMcUm8hQpLsxkxq1EKYFgzZWJr6XwyOgUANdlRhlyPOp9pjRZCJ8nR10nKw0fkKKcbcPVCLELEPzN27R+CW1AidCuykaBiM+hSRP6Hx3mfqILGHR6tpbYdFbETXiA9QKp9LuOwJnjRUx24HK2YVkCUXGJ1llrVaafqvpa1le3ydw4XBM2haUuEhOf8+eXNz9i61ZRLZIQNtbyb42/ibFbmoraCeqGMPsj5p6gQ5PY3HxkyEdrQJq95BrKjnAmZx7jP16j1oy29KjArZcwQEt+Y6kPJK+PntDflxikiscXAZK6AGbRNYzQItv';
        const data = privateKey.decrypt(req.body.data, 'utf8');
        console.log(data);
        io.emit("sync-data", data);
    }catch(e){
        console.log('decrypt fail');
    }
   
   
})
server.listen(8083);

