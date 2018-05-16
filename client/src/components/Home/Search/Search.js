import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'react-materialize'
import { fetchSearchRecipes } from '../../../actions/index'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: ''
        }
    }
    onInputType(e) {
        this.setState({ searchQuery: e.target.value })
    }

    handleSearchClick(e) {
        e.preventDefault()
        let query = this.state.searchQuery
        query = query.trim().replace(' ', '+')
        this.props.fetchRecipes(query)
    }

    render() {
        return (
            <div className="Search">
                <form>
                    <Button value="Search" waves='light' onClick={(e) => this.handleSearchClick(e)}><i className="fa fa-search"></i> Search</Button>
                    <Input type="text" autoComplete='true' label="Enter a Keyword" defaultValue={this.state.searchQuery} onChange={(e) => this.onInputType(e)} />
                </form>
            </div>
        )
    }

}
const mapStateToProps = ({ api_recipes }) => { return { api_recipes } }
const mapDispatchToProps = dispatch => {
    return { fetchRecipes: (query) => fetchSearchRecipes(dispatch, query) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)