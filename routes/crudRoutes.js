const axios = require('axios')

module.exports = app => {
    const { User } = require('../users/models')

    //get system-added recipes in user's account
    app.get('/sys_recipes/:username', (req, res) => {
        try {
            User.findOne({username: req.params.username}, (err, items) => {
                if (err) {
                    res.send(err)
                }
                if (!items.sys_recipes) {
                    res.send('No Items to Display')
                }
                res.send(items.sys_recipes)
            })
        } catch (error) {
            res.send(error)
        }
    })

    //get user-created recipes in user's account
    app.get('/user_recipes/:username', (req, res) => {
        try {
            User.findOne({ username: req.params.username }, (err, items) => {
                if (err) {
                    res.send(err)
                }
                if (!items.user_recipes) {
                    res.send('No Items to Display')
                }
                res.send(items.user_recipes)
            })
        } catch (error) {
            res.send(error)
        }
    })

//add system recipe to user sys_recipes account
    app.post('/sys_recipes/add/:username', (req, res) => {
        console.log(req.body)
        try {
            User.update({
                username: req.params.username
            }, {
                    $addToSet: {
                        sys_recipes: {
                            id: req.body[0],
                            name: req.body[1],
                            ingredients: req.body[2],
                            image: req.body[3],
                            cookTime: req.body[4]
                        }
                    },
                }, (err, response) => {
                    if (err) {
                        res.send(err)
                    }
                    res.send(response)
                })
        } catch (error) {
            res.send(error)
        }
    })
}