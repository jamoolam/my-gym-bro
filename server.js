const express = require('express')
const app = express();
const PORT = 8000

const foodOptions = {
    'met-rx triple chocolate protien bar': {
        'name' : 'Met-RX Triple Chocolate Protien Bar',
        'mealType': 'breakfast',
        'totalCal': 460,
        'protien': 30,
        'carbs': 24,
        'fats': 15
    },
    'sirloin steak': {
        'name' : 'Sirloin Steak',
        'mealType': 'dinner',
        'totalCal': 620,
        'protien': 50,
        'carbs': 44,
        'fats': 7
    },
    'jalapeno turkey sandwich': {
        'name' : 'Jalapeno Turkey Sandwich',
        'mealType': 'lunch',
        'totalCal': 500,
        'protien': 20,
        'carbs': 31,
        'fats': 4
    },
    'unknown': {
        'name' : 'unknown',
        'mealType': 'unknown',
        'totalCal': 0,
        'protien': 0,
        'carbs': 0,
        'fats': 0
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//get all food options
app.get('/foodOptions', (req, res) => {
    res.json(foodOptions)
})

//search for specific food option
app.get('/foodOptions/:name', (req, res) => {
    const foodName = req.params.name.toLowerCase()
    if(foodOptions[foodName]) {
        res.json(foodOptions[foodName])
    } else {
        res.json(foodOptions['unknown'])
    }
})

//get random food option
app.get('/random', (req, res) => {
    function getRandomFood(obj) {
        const keys = Object.keys(obj);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return obj[randomKey];
    }
    
    const randomFood = getRandomFood(foodOptions);
    console.log(randomFood)
    //if the randomized item is the unknown default, set it to steak for now
    if(randomFood !== foodOptions['unknown']) {
        res.json(randomFood)
    } else {
        res.json(foodOptions['sirloin steak'])
    }
})

app.listen(PORT, () => {
    console.log(`The server is now runnin on port ${PORT}, better go catch it!`)
})