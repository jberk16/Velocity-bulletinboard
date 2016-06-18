"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	posts: {},
	postsArray: []
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];


	switch (action.type) {
		case constants.POSTS_RECEIVED:
			console.log("POSTS_RECEIVED: " + JSON.stringify(action.posts));
			var newState = Object.assign({}, state);

			var array = [];
			for (var i = 0; i < action.posts.length; i++) {
				var post = action.posts[i];
				array.push(post);
			}

			newState.postsArray = array;
			return newState;

		case constants.POST_CREATED:
			var newState = Object.assign({}, state);
			var array = Object.assign([], newState.postsArray);
			array.unshift(action.post);
			newState.postsArray = array;

			return newState;

		default:
			return state;

	}
};