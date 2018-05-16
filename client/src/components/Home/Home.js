import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorBoundary from '../ErrorBoundary'
import Search from './Search/Search'
import Cards from './Cards/Cards'
import { fetchAPIRecipes } from '../../actions/index'

class Home extends Component {
    componentDidMount() {
        this.props.fetchRecipes()
    }

    render() {
        return <div>
            <ErrorBoundary>
                <Search />
            </ErrorBoundary>
            <ErrorBoundary>
                {this.props.api_recipes ? <Cards recipeData={this.props.api_recipes} /> : ''}
            </ErrorBoundary>
        </div>
    }
}

const mapStateToProps = ({ api_recipes }) => {
    return { api_recipes: api_recipes[0] }
}

const mapDispatchToProps = dispatch => {
    return { fetchRecipes: () => fetchAPIRecipes(dispatch) } //passes dispatch to function
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)