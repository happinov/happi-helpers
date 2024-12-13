export default (req,res,next)=> {
	// disable all cache.
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', 0)
	next()
}
