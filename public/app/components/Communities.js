import React, { Component } from 'react'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import CommunityPreview from '../components/CommunityPreview'
import Nav from '../components/Nav'


class Communities extends Component {

	constructor(props, context){
		super(props, context)
		this.updateNewCommunity = this.updateNewCommunity.bind(this)
		this.addCommunity = this.addCommunity.bind(this)
		this.updateCredentials = this.updateCredentials.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			newCommunity: {
				name:'',
				city:'',
				address:'',
				state:''
			},
			credentials: {
				email:'',
				password:''
			}
		}
	}

	componentDidMount(){
		api.handleGet('/api/community', null, function(err, response){
			if (err){
				alert('OOPS! '+err)
				return
			}

			store.dispatch(actions.communitiesReceived(response.results))

		})

	}

	updateCredentials(event){
		console.log('updateUser: '+event.target.id+' == '+event.target.value)
		var credentials = Object.assign({}, this.state.credentials)
		credentials[event.target.id] = event.target.value
		this.setState({
			credentials: credentials
		})
	}

	login(event){
		event.preventDefault()
		console.log(JSON.stringify(this.state.credentials))

		api.handlePost('/account/login', this.state.credentials, function(err, response){
			if (err != null){
				alert(err.message)
				return
			}

//			console.log(JSON.stringify(response))
			window.location.href = '/account'
		})

	}

	addCommunity(event){
		event.preventDefault()
		api.handlePost('/api/community', this.state.newCommunity, function(err, response){
			if (err){
				alert('OOPS - '+err)
				return
			}

			console.log('Community CREATED: '+JSON.stringify(response))
			store.dispatch(actions.communityCreated(response.result))
		})

	}

	updateNewCommunity(event){
//		console.log('updateNewCommunity: '+event.target.id+' = '+event.target.value)
		var community = Object.assign({}, this.state.newCommunity)
		community[event.target.id] = event.target.value
		this.setState({
			newCommunity: community
		})
	}

	render(){
		var list = this.props.communities.map(function(community, i){
			return <CommunityPreview key={community.id} community={community} />

		})

		var content = null
		if (this.props.currentUser.id == null) {
			content = <div className="well well-lg nobottommargin">
		                            <form id="login-form" name="login-form" className="nobottommargin" action="#" method="post">
		                                <h3>Log In</h3>
		                                <div className="col_full">
		                                    <label for="login-form-username">Email:</label>
		                                    <input  onChange={this.updateCredentials} type="text" id="email" name="login-form-username" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full">
		                                    <label for="login-form-password">Password:</label>
		                                    <input onChange={this.updateCredentials} type="password" id="password" name="login-form-password" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full nobottommargin">
		                                    <button onClick={this.login} className="button button-3d nomargin" id="login-form-submit" name="login-form-submit" value="login">Login</button>
		                                    <a href="#" className="fright">Forgot Password?</a>
		                                </div>
		                            </form>

		                        </div>
		}

		else {
			content = <div className="well well-lg nobottommargin">
		                            <form id="login-form" name="login-form" className="nobottommargin" action="#" method="post">
		                                <h3>Create A Community</h3>
		                                <div className="col_full">
		                                    <label for="login-form-username">Name:</label>
		                                    <input  onChange={this.updateNewCommunity} type="text" id="name" name="login-form-username" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full">
		                                    <label for="login-form-password">Address:</label>
		                                    <input onChange={this.updateNewCommunity} type="text" id="address" name="login-form-username" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full">
		                                    <label for="login-form-password">City:</label>
		                                    <input onChange={this.updateNewCommunity} type="text" id="city" name="login-form-username" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full">
		                                    <label for="login-form-password">State:</label>
		                                    <input onChange={this.updateNewCommunity} type="text" id="state" name="login-form-username" className="required form-control input-block-level" />
		                                </div>

		                                <div className="col_full nobottommargin">
		                                    <button onClick={this.addCommunity} className="button button-3d nomargin" id="login-form-submit" name="login-form-submit" value="addCommunity">Add Community</button>
		                                    <a href="#" className="fright">Forgot Password?</a>
		                                </div>
		                            </form>

		                        </div>
		}

		return (
			<div>
				<Nav transparent="yes" />
		        <section id="slider" style={{background: 'url("/images/nyc.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <br />
		        </section>

		        <section id="content">
		            <div className="content-wrap">
						<div className="container clearfix">

							<div className="col_three_fifth bothsidebar nobottommargin">
			                    <div className="fancy-title title-border">
			                        <h3>Communities</h3>
			                    </div>

			                    <div id="posts" className="events small-thumbs">
									{list}
			                    </div>
			                </div>

		                    <div className="col_one_third nobottommargin">

		                    {content}
		                    </div>

						</div>
		            </div>
		        </section>

			</div>
		)
	}
}

const stateToProps = function(state){

	console.log('STATE TO PROPS: '+JSON.stringify(state))
	return {
		communities: state.communityReducer.communitiesArray,
		currentUser: state.accountReducer.currentUser
	}

}

export default connect (stateToProps)(Communities)