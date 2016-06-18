var Post = require('../models/Post');
var mongoose = require('mongoose');


// - - - - - - - - - - - - - - - - - - - - HELPER METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function convertToJson(posts){
	var results = new Array();
    for (var i=0; i<posts.length; i++){
  	  var p = posts[i];
  	  results.push(p.summary());
    }
	
	return results;
}

module.exports = {

	pluralKey: function(){
		return 'posts';
	},

	get: function(params, completion){

		// fetch specific Course by ID:
		if (params.id != null){ 
			Post.findById(params.id, function(err, post){
				if (err){
					completion({message:'Course '+params.id+' not found'}, null);
					return;
				}
				
				if (post == null){
					completion({message:'Course '+params.id+' not found'}, null);
					return;
				}

				completion(null, post.summary());
			});
			return;
		}
		
		
		/* Query by filters passed into parameter string: */
		var limit = params.limit;
		if (limit == null)
			limit = 0;
		
		delete params['limit'];
		
		Post.find(params, null, {limit:limit, sort:{priority: -1}}, function(err, posts) {
			if (err) {
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, convertToJson(posts));
		});
	},

	post: function(postinfo, completion){
		Post.create(postinfo, function(err, post){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, post.summary());
			return;
		});
	},



	put: function(postId, postinfo, completion){
		Post.findByIdAndUpdate(postId, postinfo, {new:true}, function(err, post){
			if (err){
				completion({confirmation:'fail', message:err.message}, null);
				return;
			}
			
			completion(null, post.summary());
			return;
		});		
	},

	delete: function(){

	}

}



