var twitter = require('twitter'),
	handler, data, home;

var text = '';
var data = [];


var client = new twitter({
  consumer_key: 'RgKVGIpeM38nvAljHmOIcZgu2',
		consumer_secret: 'cX1oxhS9veOpwPnnECdba62FsOy0LGsNHl7OEtTJz4GYCx8SNX',
		access_token_key: '1688905356-8RHE2C6YJSvKplnNyykbMHgcXzaKcqqSll1QLkt',
		access_token_secret:'w9LQCQuAEWQn81KwAOhDqeUyn3I4EmhSrSkf2k2UulpZy'
});



user_timeline = function(req, res) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  client.get('statuses/user_timeline', { screen_name: 'siberiian', count: 20 }, function(error, tweets, response) {
    if (!error) {
    	res.sendStatus(200);
    	for (i = 0; i < tweets.length; i++) { 
		    text += tweets[i].text + "\n";
		}
    	console.log(text);
    }
    else {
      // res.status(500).json({ error: error });
      console.log("error");
    }
  });
};

search = function(req,res) {
	client.get('search/tweets', {q: '#harefatag'}, function(error, tweets, response){
		res.sendStatus(200);
  //   	for (i = 0; i < tweets.statuses.length; i++) { 
		//     text += tweets.statuses[i].text + "\n";
		// }
    	console.log(tweets.statuses.length);
	});
};

stream_search = function(req, res) {
	client.stream('statuses/filter', {track: '#SegeraJerujikanAhok'}, function(stream) {
	  	stream.on('data', function(tweet) {
	  		data.push(tweet);
	    	console.log(tweet.text);
	  	});

		stream.on('error', function(error) {
	    	throw error;
	  	});
	});
}

stream_sample = function(req, res) {
	client.stream('statuses/sample', {}, function(stream) {
	  	stream.on('data', function(tweet) {
	  		data.push(tweet);
	    	// console.log(tweet.text);
	  	});

	  	setTimeout(function(){
	  		console.log("Collected "+ data.length + " tweets");
	  	},5000);

		stream.on('error', function(error) {
	    	throw error;
	  	});
	});
}


home = function(req, res){

};

handler = {
	home 			: home,
	user_timeline 	: user_timeline,
	search 			: search,
	stream_search 	: stream_search,
	stream_sample 	: stream_sample,
	// battle			: battle
}

module.exports = handler;