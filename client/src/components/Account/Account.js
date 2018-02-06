import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import { fetchAccountRecipes, deleteRecipe } from '../../actions/index'
import './Account.css'

class Account extends Component {
    componentDidMount() {
        this.props.fetchRecipes(this.props.auth.username)
    }

    onDeleteClick(recipeId, recipeType, i) {
        const body = [this.props.auth.username, recipeType, recipeId, i]
        this.props.deleteRecipe(body)
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
                    <label id={recipe.id} htmlFor={recipe.id}>
                        <i className='fa fa-trash-o fa-1x' onClick={(e) => { this.onDeleteClick(e.target.parentNode.id, 'sys_recipes', i) }}></i>
                    </label>
                </div>
            </CollapsibleItem>
        })
    }

    renderUserRecipes() {
        const userRecipes = this.props.accountRecipes[1]
        if (userRecipes.length === 0) {
            return 'No Recipes to Display'
        } else {
            return <CollapsibleItem header='First'>
            </CollapsibleItem>
        }
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
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = ({ auth, accountRecipes }) => { return { auth, accountRecipes } }
const mapDispatchToProps = dispatch => {
    return {
        fetchRecipes: username => fetchAccountRecipes(dispatch, username),
        deleteRecipe: body => deleteRecipe(dispatch, body)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
