import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle } from 'react-materialize'
import { addSysRecipe } from '../../../actions/index'
import './Cards.css'

class Cards extends Component {
    secondsToHms(seconds) {
        seconds = Number(seconds)
        const h = Math.floor(seconds / 3600)
        const m = Math.floor(seconds % 3600 / 60)

        const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : ""
        const mDisplay = m > 0 ? m + (m === 1 ? " minute" : " minutes") : ""
        return hDisplay + mDisplay
    }

    clickAddItem(data) {
        const time = this.secondsToHms(data.totalTimeInSeconds)
        let image
        data.imageUrlsBySize["90"] ? image = data.imageUrlsBySize["90"]
            : image = 'https://res.cloudinary.com/andrerichards/image/upload/v1517793260/noImage_erqriy.jpg'
        const body = [
            data.id,
            data.recipeName,
            data.ingredients,
            image,
            time
        ]
        this.props.addRecipe(this.props.auth.username, body)
    }

    render() {
        const recipeData = this.props.recipeData
        let recipeList = ''
        if (!recipeData) {
            recipeList = <p>Could not retrieve Recipe data</p>
        } else if (recipeData.length === 0) {
            recipeList = <p>No results found for your query</p>
        } else {
            recipeList = recipeData.map(recipe => {
                const ingredients = recipe.ingredients.join().split(",")
                const ingredList = ingredients.map((item, i) => {
                    return <li key={i} className="ingredients">{item}</li>
                })
                let image
                !recipe.imageUrlsBySize ? image = 'https://res.cloudinary.com/andrerichards/image/upload/v1517793260/noImage_erqriy.jpg'
                    : image = recipe.imageUrlsBySize[90]
                return (
                    <Card header={<CardTitle reveal image={image}
                        className='tooltip' waves='light'><span className="tooltiptext">Click for Ingredients</span></CardTitle>}
                        key={recipe.id} className="recipeItems"
                        title={recipe.recipeName}
                        reveal={<span>Ingredients: <ul>{ingredList}</ul></span>}>
                        <i className="fa fa-plus-circle fa-2x" aria-hidden="true"
                            onClick={e => this.clickAddItem(recipe)}></i>
                    </Card>
                )
            })
        }

        return (
            <div className="Cards">
                <section>
                    {recipeList}
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({ auth, accountRecipes }) => { return { auth, accountRecipes } }
const mapDispatchToProps = dispatch => {
    return { addRecipe: (username, recipe) => addSysRecipe(dispatch, username, recipe) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cards)