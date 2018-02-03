import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { addSysRecipe } from '../../actions/index'
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
        const body = [
            data.id,
            data.recipeName,
            data.ingredients,
            data.imageUrlsBySize["90"],
            time
        ]
        // this.props.dispatch(addSysRecipe(this.props.auth.id, this.props.auth.service, body))
    }

    render() {
        console.log(this.props.recipeData)
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
                return (
                    <div key={recipe.id} className="recipeItems">
                        <img src={recipe.imageUrlsBySize[90]} alt={recipe.recipeName} />
                        <i className="fa fa-plus-circle fa-2x" aria-hidden="true"
                            onClick={e => this.clickAddItem(recipe)}></i>
                        <div className="tooltip"><p>{recipe.recipeName}</p>
                            <span className="tooltiptext">Ingredients: <ul>{ingredList}</ul></span>
                        </div>
                    </div>
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

export default Cards
// function mapStateToProps({ auth, accountRecipes }) { return { auth, accountRecipes } }
// export default connect(mapStateToProps)(Cards)