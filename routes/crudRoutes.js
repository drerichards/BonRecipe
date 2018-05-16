const axios = require('axios')

module.exports = app => {
    const { User } = require('../users/models')

    //get system-added recipes in user's account
    app.get('/sys_recipes/:username', (req, res) => {
        try {
            User.findOne({ username: req.params.username }, (err, items) => {
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

    //add user recipe to user user_recipes account
    app.post('/user_recipes/add/:username', (req, res) => {
        try {
            User.update({
                username: req.params.username
            }, {
                    $addToSet: {
                        user_recipes: {
                            id: req.body.id,
                            name: req.body.name,
                            ingredients: req.body.ingredients
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

    app.post('/user_recipes/edit/:username', (req, res) => {
        try {
            User.findOneAndUpdate({
                username: req.params.username,
                'user_recipes.id': req.body[0][1]
            }, {
                    $set: {
                        'user_recipes.$.name': req.body[0][0],
                        'user_recipes.$.ingredients': req.body[1]
                    },
                }, { new: true },
                (err, response) => {
                    if (err) {
                        res.send(err)
                    }
                    res.send(response)
                })
        } catch (error) {
            res.send(error)
        }
    })

    //delete recipes
    app.put('/recipe/delete', (req, res) => {
        try {
            if (req.body[1] === 'sys_recipes') {
                User.update({
                    username: req.body[0]
                }, {
                        $pull: {
                            sys_recipes: {
                                id: req.body[2]
                            }
                        }
                    }, (err, response) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send(response)

                    })
            } else if (req.body[1] === 'user_recipes') {
                User.update({
                    username: req.body[0]
                }, {
                        $pull: {
                            user_recipes: {
                                id: req.body[2]
                            }
                        }
                    }, (err, response) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send(response)
                    })
            }
        } catch (error) {
            res.send(error)
        }
    })
}