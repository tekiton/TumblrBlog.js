/**
 * TumblrBlog.js
 *
 * @author tekiton (https://github.com/tekiton/)
 * @license MIT LICENSE :)
 */
window.TumblrBlog = (function(){

	var TumblrBlog = function(params){
		this.apiKey       = params.apiKey;
		this.baseHostname = params.baseHostname;
		this.protocol     = (location.protocol==='https:'? 'https:': 'http:');
		this.option       = {};
	};

	TumblrBlog.prototype.setOption = function(option){
		this.option = option;
	};

	TumblrBlog.prototype.api = function(method, option, callback){
		if( option == null ) option = {};
		option['api_key'] = this.apiKey;
		return $.ajax(
			this.protocol + '//api.tumblr.com/v2/blog/'+ this.baseHostname +'/'+method,
			{ data:option, dataType:'jsonp' }
		).done(function(data){
			if(callback) callback(data);
		});
	};

	TumblrBlog.prototype.getInfo = function(option, callback){
		return this.api('info', option, callback);
	};

	TumblrBlog.prototype.getPosts = function(option, callback){
		if( option == null ) option = {};
		option = $.extend(option, this.option);
		return this.api('posts', option, callback);
	};

	return TumblrBlog;

})();
