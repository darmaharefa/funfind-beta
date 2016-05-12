var handler, txt,
	home;

txt = "Hello World";

home = function(req, res){
	res.render("home.html",{'data':txt});
};

handler = {
	home : home
}

module.exports = handler;