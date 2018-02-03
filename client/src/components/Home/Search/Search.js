import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'react-materialize'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: ' '
        }
    }
    onInputType(e) {
        this.setState({
            searchQuery: e.target.value
        })
    }

    handleSearchClick(e) {
        e.preventDefault()
        let query = this.state.searchQuery
        query = query.trim().replace(' ', '+')
        // this.props.dispatch(searchRecipe(query))
    }

    render() {
        return (
            <div className="Search">
                <form>
                    <Button value="Search" waves='light' onClick={(e) => this.handleSearchClick(e)}><i className="fa fa-search"></i> Search</Button>
                    <Input type="text" label="Enter a Keyword" defaultValue={this.state.searchQuery} onChange={(e) => this.onInputType(e)} />
                </form>
            </div>
        )
    }
}
function mapStateToProps({ recipes }) { return { recipes } }
export default connect(mapStateToProps)(Search)