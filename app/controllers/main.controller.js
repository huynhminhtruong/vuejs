module.exports = {
	showHome: (req, res) => {
		res.sendFile('index.html', { root: '././views' })
	}
}