module.exports = function(app, root) {
	app.get('/', function(req, res) {
		res.sendFile('index.html', { root: root })
	})
}