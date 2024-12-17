
const parameterString = window.location.search.replace(/^\?/,'')
const parameters = {}

if (parameterString) {
	const sourceString = parameterString.replace(/\+/g, ' ')
	const searchPattern = /([^&=]+)=?([^&]*)/g

	let match = null
	while(match = searchPattern.exec(parameterString))
		parameters[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
}

export default parameters
