import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, Modal, Button } from 'react-materialize'
import { addSysRecipe } from '../../../actions/index'
import './Cards.css'
import ChipBar from './Chip/ChipBar'

class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRecipe: [],
            duplicateRecipe: false,
            recipeCount: this.props.accountRecipes[0].length
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.recipeCount === nextProps.accountRecipes[0].length ? this.setState(() => ({ duplicateRecipe: true })) :
            this.setState(() => ({ duplicateRecipe: false, recipeCount: this.state.recipeCount + 1 }))
    }

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
        this.setState(() => ({ selectedRecipe: [image, data.recipeName] }))
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
                <div className='infoBar'>
                    <span>
                        <p className='recipeResults'>Results: {this.props.recipeData.length}</p>
                        {this.state.selectedRecipe[1] ?
                            <ChipBar duplicateRecipe={this.state.duplicateRecipe} img={this.state.selectedRecipe[0]} text={this.state.selectedRecipe[1]} /> : ''
                        }
                    </span>
                    <Modal header='How-To Guide' trigger={<Button><i className="fa fa-info-circle"></i> Guide</Button>}>
                        <div id='infoModal' className="modalBody">
                            <h5>Welcome to Bon Recipe!</h5>
                            <p>What's for dinner? If you've ever had to ask yourself this question,
                            then let Bon Recipe find you suggestions for popular recipes that you can easily make at home!</p>
                            <br />
                            <h5>Getting Started</h5>
                            <ul>
                                <li><p> - First, search for recipes with a single or even multiple ingredients you have chilling in the fridge</p></li>
                                <li><p> - Next, click the '+' on each recipe card to save it to your personal Account</p></li>
                                <li><p> - Be sure to view your Account page for a list of all Saved Recipes and create new ones of your own!</p></li>
                            </ul>
                            <p>Enjoy and Bon Appetit!</p>
                        </div>
                    </Modal>
                </div>
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