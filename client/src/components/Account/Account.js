import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapsible, CollapsibleItem, Button, Modal, Row, Input } from 'react-materialize'
import { fetchAccountRecipes, addUserRecipe, deleteRecipe } from '../../actions/index'
import './Account.css'

class Account extends Component {
    componentDidMount() {
        this.props.fetchRecipes(this.props.auth.username)
    }

    onDeleteClick(recipeId, recipeType, i) {
        const body = [this.props.auth.username, recipeType, recipeId, i]
        this.props.deleteRecipe(body)
    }

    onAddIngredClick(e) {
        e.preventDefault()
        const ingredAddList = document.getElementById('ingredAddList')
        const ingredField = document.createElement(`input`)
        ingredField.classList.add('inputField')
        ingredField.classList.add('extraField')
        ingredField.setAttribute("type", "text")
        ingredField.setAttribute("placeholder", "Add another")
        ingredAddList.insertAdjacentElement('beforeend', ingredField)
    }

    onRecipeSubmit(e) {
        e.preventDefault()
        const inputFields = document.getElementsByClassName('inputField')
        const extraField = document.querySelectorAll('.extraField')
        const inputArray = []
        const timestamp = new Date().getTime()

        //if title and first ingred fields not empty
        if (inputFields[0].value.length !== 0 && inputFields[1].value.length !== 0) {
            for (let i = 0; i < inputFields.length; i++) { //for each value in the ingredient field
                if (inputFields[i].value.length > 0) { //if index isn't empty
                    inputArray.push(inputFields[i].value) //push to array
                    inputFields[i].value = '' //set to default empty box
                }
            }
            const elemId = inputArray[0].replace(/ /g, "_") //replace space in title with _
            inputArray.unshift(elemId + timestamp) //combine title with timestamp
            const body = {
                id: inputArray[0],
                name: inputArray[1],
                ingredients: inputArray.slice(2)
            }
            Array.prototype.forEach.call(extraField, (node) => {
                node.parentNode.removeChild(node);
            })
            this.props.addRecipe(this.props.auth.username, body)
        } else {
            const errorBar = document.getElementById('errorBar')
            errorBar.style.display = 'block'
            errorBar.style.opacity = '1'
            setTimeout(() => { errorBar.style.display = 'none' }, 3000)
        }
    }

    renderSysRecipes() {
        const sysRecipes = this.props.accountRecipes[0]
        return sysRecipes.map((recipe, i) => {
            const ingredList = recipe.ingredients.map((item, i) => {
                return <div key={i} className="ingredients">{i + 1}. {item}</div>
            })
            return <CollapsibleItem key={i} header={recipe.name}>
                <div className="tab-content">
                    <section className="imageSection">
                        <img src={recipe.image} alt={recipe.name} />
                        <span>Cook Time: {recipe.cookTime}</span>
                    </section>
                    <section className="ingredSection">
                        <h5>Ingredients:</h5>
                        <aside>{ingredList}</aside>
                    </section>
                    <label id={recipe.id}>
                        <i className='fa fa-trash-o fa-1x' onClick={e => { this.onDeleteClick(e.target.parentNode.id, 'sys_recipes', i) }}></i>
                    </label>
                </div>
            </CollapsibleItem>
        })
    }

    collectEditData(e) {
        e.preventDefault()
        const modalId = e.target.parentNode.parentNode.id
        const editfields = Array.prototype.slice.call(document.querySelectorAll(`#${modalId} .input-field`))
        return editfields.map((edit, i) => {
            return console.log(edit.innerHTML);
        })
    }

    renderUserRecipes() {
        const userRecipes = this.props.accountRecipes[1]
        return userRecipes.map((recipe, i) => {
            const ingredList = recipe.ingredients.map((item, i) => {
                return <div key={i} className="ingredients">{i + 1}. {item}</div>
            })
            const editIngredList = recipe.ingredients.map((item, i) => {
                return <Input key={i} className="editField" s={6} defaultValue={item} />
            })
            return <CollapsibleItem key={i} header={recipe.name}>
                <div className="tab-content">
                    <section className="ingredSection">
                        <h5>Ingredients:</h5>
                        <aside>{ingredList}</aside>
                    </section>
                    <div className='iconSection'>
                        <Modal
                            header='Edit Recipe?'
                            trigger={<div><i className='fa fa-edit fa-1x'></i> Edit</div>}>
                            <Row>
                                <Input defaultValue={recipe.name} s={12} label="Recipe Title" />
                                {editIngredList}
                            </Row>
                            <Button className='' waves='light' onClick={e => this.collectEditData(e)}><i className='fa fa-check-circle fa-1x'></i> Save Changes</Button>
                        </Modal>
                        <label id={recipe.id}>
                            <i className='fa fa-trash-o fa-1x' onClick={e => { this.onDeleteClick(e.target.parentNode.id, 'user_recipes', i) }}></i>
                        </label>
                    </div>
                </div>
            </CollapsibleItem>
        })
    }



    render() {
        return <div className='Account'>
            <h4>{this.props.auth.username}'s Account</h4>
            <div className="collapse-container">
                <div className="sysCollapse">
                    <p>Saved Recipes: {this.props.accountRecipes[0].length}</p>
                    {this.props.accountRecipes[0].length === 0 ? 'No Recipes to Display' :
                        <Collapsible className='collapsible card' accordion>
                            {this.renderSysRecipes()}
                        </Collapsible>
                    }
                </div>
                <div className="userCollapse">
                    <p>{this.props.auth.username}'s Recipes: {this.props.accountRecipes[1].length}</p>
                    {this.props.accountRecipes[1].length === 0 ? 'No Recipes to Display' :
                        <Collapsible className='collapsible card' accordion>
                            {this.renderUserRecipes()}
                        </Collapsible>}
                    <form className="addRecipeForm card">
                        <span id="errorBar">Recipe title and at least one ingredient is Required</span>
                        <h5>Add Your Own Recipe:</h5>
                        <h6>(Must have title and at least 1 ingredient. Click the '+' for multiple ingredients)</h6>
                        <div>
                            <p>Recipe Title:</p>
                            <input type="text" className="inputField" />
                        </div>
                        <div>
                            <p>Ingredient(s):</p>
                            <input type="text" placeholder="Add an Ingredient" className="inputField" />
                            <span id="ingredAddList"></span>
                            <i className="fa fa-plus-circle fa-x" aria-hidden="true" onClick={e => { this.onAddIngredClick(e) }}></i>
                        </div>
                        <Button className='recipeBtn' waves='light' onClick={e => this.onRecipeSubmit(e)}>Submit Recipe</Button>
                    </form>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = ({ auth, accountRecipes }) => { return { auth, accountRecipes } }
const mapDispatchToProps = dispatch => {
    return {
        fetchRecipes: username => fetchAccountRecipes(dispatch, username),
        addRecipe: (username, recipe) => addUserRecipe(dispatch, username, recipe),
        deleteRecipe: body => deleteRecipe(dispatch, body)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
