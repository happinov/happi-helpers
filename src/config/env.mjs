
import Debug from 'debug'
const debug = Debug('happi:helpers:config:env')

function parseIntIgnoreNull(value) {
	if (value == null)
		return
	return parseInt(value,10)
}

const PARSE_FUNCTIONS = {
	int: parseIntIgnoreNull,
}

function parseValue(key,value) {
	if (PARSE_FUNCTION[key])
		return PARSE_FUNCTION[key](value)
	return value
}

export default {
	initialize(envMapping) {
		const result = {
			isDevelopment: process.env.NODE_ENV == 'development',
		}

		for (const [key,mapping] of Object.entries(envMapping)) {
			const originalValue = process.env[key]
			const processedValue = PARSE_FUNCTIONS[mapping.type]?.(originalValue) ?? originalValue ?? mapping.defaultValue

			result[mapping.name] = processedValue
			debug('Processed env:',key,mapping,process.env[key],processedValue)
		}

		return result
	},
}
