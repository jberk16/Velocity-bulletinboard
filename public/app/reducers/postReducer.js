import constants from '../constants/constants'

var initialState = {
	posts: {},
	postsArray: []
}

export default function(state = initialState, action){

	switch (action.type) {
		case constants.POSTS_RECEIVED:
			console.log('POSTS_RECEIVED: '+JSON.stringify(action.posts))
			var newState = Object.assign({}, state)

			var array = []
			for (var i=0; i<action.posts.length; i++){
				var post = action.posts[i]
				array.push(post)
			}

			newState['postsArray'] = array
			return newState

		case constants.POST_CREATED:
			var newState = Object.assign({}, state)
			var array = Object.assign([], newState.postsArray)
			array.unshift(action.post)
			newState['postsArray'] = array

			return newState

		default:
			return state

	}

}