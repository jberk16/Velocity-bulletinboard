import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../../utils/api'
import Nav from '../../components/Nav'
import actions from '../../actions/actions' 
import store from '../../stores/store' 

class Community extends Component {

	constructor(props, context){
		super(props, context)
		this.updatePost = this.updatePost.bind(this)
		this.submitPost = this.submitPost.bind(this)
		this.fetchPosts = this.fetchPosts.bind(this)
		this.state = {
			post: {
				title: '',
				text: '',
				profile: '',
				community: ''
			}

		}
	}

	componentDidMount(){
		var _this = this
		var endpoint = '/api/community?slug='+this.props.slug
		api.handleGet(endpoint, null, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			var results = response.results
			store.dispatch(actions.communitiesReceived(results))
			_this.fetchPosts()

		})
	}


	fetchPosts(){
		if (this.props.community.id == null)
			return

		var endpoint = '/api/post?community='+this.props.community.id
		api.handleGet(endpoint, null, function(err, response){
			if (err){
				alert(err.message)
				return
			}
			console.log('FETCH POSTS: '+ response.results)
			store.dispatch(actions.postsReceived(response.results))
		})
	}


	updatePost(event){
		var updatedPost = Object.assign({}, this.state.post)
		updatedPost[event.target.id] = event.target.value
		this.setState({
			post: updatedPost
		})
	}

	submitPost(event){
		if (this.props.currentUser.id == null){ //not logged in
			alert('Please log in to submit a post.')
			return
		}

		var _this = this
		var newPost = Object.assign({}, this.state.post)
		newPost['community'] = this.props.community.id
		newPost['profile'] = this.props.currentUser.id
		api.handlePost('/api/post', newPost, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			_this.setState({
				post: {
					title: '',
					text: '',
					profile: '',
					community: ''
				}
			})

			var result = response.result
			console.log('POST CREATED: ' + JSON.stringify(result))
			store.dispatch(actions.postCreated(result))
		})
	}

	render(){

		var postList = this.props.posts.map(function(post, i){
			return (
				<a key={post.id} href="#" className="list-group-item">
		            <h4 className="list-group-item-heading">{post.title}</h4>
		            <p className="list-group-item-text">{post.text}</p>
		    	</a>
				)
		})
		return (
			<div>
				<Nav transparent="no" />

		        <section id="content">
		            <div className="content-wrap">
		                <div className="container clearfix">
		                    <div className="postcontent nobottommargin clearfix">

		                        <h4>{this.props.community.name}</h4>
		                        <span>Hello , {this.props.currentUser.firstName}</span>
		                        <input id='title' onChange={this.updatePost} className='form-control' type='text' placeholder='Post Title' /> <br/>
		                        <textarea id='text' onChange={this.updatePost} placeholder='Post Text' className='form-control' ></textarea> <br/>
		                        <button onClick={this.submitPost} className='btn btn-success'>Add Post</button>
		                        <hr style={{borderTop:'1px solid #ddd'}} />

		                        <div className="list-group">
		                        	{postList}
		                        </div>	
		                    </div>				
		                </div>				
		            </div>				
		        </section>				

			</div>
		)
	}
}

const stateToProps = function(state){
	var communitiesArray = state.communityReducer.communitiesArray

	return {
		community: (communitiesArray.length==0) ? {name:''} : communitiesArray[0],
		posts: state.postReducer.postsArray,
		currentUser: state.accountReducer.currentUser
	}

}

export default connect(stateToProps)(Community)