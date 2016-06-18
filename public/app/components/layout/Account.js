import React, { Component } from 'react'
import api from '../../utils/api'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'

class Account extends Component {

	constructor(props, context){
		super(props, context)
		this.logout = this.logout.bind(this)
		this.state = {
			currentUser: {
				firstName: '',
				lastName: '',
				email: ''
			}
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/account/currentuser', null, function(err, response){
			if (err){
				// console.log(JSON.stringify(err.message))
				// console.log('1')
				return
			}

			store.dispatch(actions.currentUserReceived(response.user))
			return
		})
	}

	logout(event){
		event.preventDefault()
//		console.log('Logout')

		api.handleGet('/account/logout', null, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			window.location.href = '/'
			return
		})
	}

	render(){
		return (
			<div>

				<Nav/>

		        <section id="slider" style={{background: 'url("/images/nyc.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <br />
		        </section>
				This is the Account Page!
				<h1>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</h1>
				<a onClick={this.logout} href="#">Logout</a>
			</div>
		)
	}
}

const stateToProps = function(state){

	return {
		currentUser: state.accountReducer.currentUser
	}

}

export default connect (stateToProps)(Account)






