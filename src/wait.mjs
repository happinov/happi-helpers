
function wait(duration) {
	return new Promise((resolve)=> {
		return setTimeout(resolve,duration ?? 0)
	})
}

export default wait
