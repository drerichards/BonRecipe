import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import { fetchAccountRecipes } from '../../actions/index'
import './Account.css'

class Account extends Component {
    componentDidMount() {
        this.props.fetchRecipes(this.props.auth.username)
    }

    renderSysRecipes() {
        // console.log(this.props.accountRecipes[0])
        const sysRecipes = this.props.accountRecipes[0]
        if (sysRecipes.length === 0) {
            return 'No Items to Display'
        } else {
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
                    <label id={recipe.id} className='sys_recipes' htmlFor={recipe.id}>
                        <i className='fa fa-trash-o fa-1x' onClick={(e) => { this.handleDeleteClick(e.target.parentNode.id, e.target.parentNode.className) }}></i>
                    </label>
                    </div>
                </CollapsibleItem>
            })
        }
    }
    renderUserRecipes() {
        // console.log(this.props.accountRecipes[1])
        const userRecipes = this.props.accountRecipes[1];
        if (userRecipes.length === 0) {
            return 'No Items to Display'
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
                    <p>{this.props.accountRecipes[0].length} Recipe(s)</p>
                    <Collapsible className='collapsible card' accordion>
                        {this.renderSysRecipes()}
                    </Collapsible>
                </div>
                <div className="userCollapse">
                    <p>{this.props.accountRecipes[1].length} Recipe(s)</p>                    
                    <Collapsible className='collapsible card' accordion>
                        {this.renderUserRecipes()}
                    </Collapsible>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = ({ auth, accountRecipes }) => { return { auth, accountRecipes } }
const mapDispatchToProps = dispatch => {
    return { fetchRecipes: (username) => fetchAccountRecipes(dispatch, username) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
