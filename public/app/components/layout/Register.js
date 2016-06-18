import React, { Component } from 'react'
import api from '../../utils/api'
import Nav from '../../components/Nav'

class Register extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUser = this.updateUser.bind(this)
		this.updateCredentials = this.updateCredentials.bind(this)
		this.register = this.register.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			user: {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			},
			credentials: {
				email: '',
				password: ''				
			}
		}
	}

	updateUser(event){
//		console.log('updateUser: '+event.target.id+' == '+event.target.value)
		var updatedUser = Object.assign({}, this.state.user)
		updatedUser[event.target.id] = event.target.value
		this.setState({
			user: updatedUser
		})
	}

	updateCredentials(event){
//		console.log('updateUser: '+event.target.id+' == '+event.target.value)
		var credentials = Object.assign({}, this.state.credentials)
		credentials[event.target.id] = event.target.value
		this.setState({
			credentials: credentials
		})
	}

	register(event){
		event.preventDefault()
		api.handlePost('/api/profile', this.state.user, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			window.location.href = '/account'
		})
	}

	login(event){
		event.preventDefault()
//		console.log(JSON.stringify(this.state.user))

		api.handlePost('/account/login', this.state.credentials, function(err, response){
			if (err != null){
				alert(err.message)
				return
			}

//			console.log(JSON.stringify(response))
			window.location.href = '/account'
		})

	}

	render(){
		return (
			<div>
				<Nav />

		        <section id="slider" style={{background: 'url("/images/nyc.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <br />
		        </section>
				<h2>Sign Up</h2>
				<input type="text" onChange={this.updateUser} id="firstName" placeholder="First Name" /><br />
				<input type="text" onChange={this.updateUser} id="lastName" placeholder="Last Name" /><br />
				<input type="text" onChange={this.updateUser} id="email" placeholder="Email" /><br />
				<input type="password" onChange={this.updateUser} id="password" placeholder="Password" /><br />
				<button onClick={this.register}>Register</button>


				<h2>Log In</h2>
				<input type="text" onChange={this.updateCredentials} id="email" placeholder="Email" /><br />
				<input type="password" onChange={this.updateCredentials} id="password" placeholder="Password" /><br />
				<button onClick={this.login} >Login</button>

			</div>
		)
	}
}

export default Register