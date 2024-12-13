
import path from 'path'
import fs from 'fs'
import _ from 'lodash'

import Debug from 'debug'
const debug = Debug('happi:config:file')

function loadConfig(filePath) {
	try {
		const loadedConfigString = fs.readFileSync(filePath, {encoding:'utf8'})
		return JSON.parse(loadedConfigString)
	} catch(err) {
		if (err.code == 'ENOENT')
			return {} // if no file then config is empty.

		throw err
	}
}

function writeConfig(targetFilePath,content={}) {
	const newConfigString = JSON.stringify(content,null,'\t')

	const backupFilePath = targetFilePath+'.prev'
	const tempFilePath = targetFilePath+'.new'

	debug('Writing current conf to temp file:',tempFilePath)
	fs.writeFileSync(tempFilePath,newConfigString, {encoding:'utf8'})

	if (fs.existsSync(targetFilePath)) {
		debug('Backuping on disk configuration:',backupFilePath)
		fs.renameSync(targetFilePath,backupFilePath) // previous backup is overwritten if it exists.
	}

	debug('Moving up to date configuration in place:',targetFilePath)
	fs.renameSync(tempFilePath,targetFilePath)
}

function assignDefault(target,key,value) {
	const tokens = key.split('.')

	if (tokens.includes(''))
		throw new Error('Invalid key:',key)

	let currentTarget = target

	while (tokens.length > 1)
		currentTarget = currentTarget[tokens.shift()] ||= {}

	if (_.isFunction(value))
		value = value()

	currentTarget[tokens[0]] = value
}

export default {
	readAndUpdate(filePath,defaultValues) {
		const configFolder = path.dirname(filePath)
		fs.mkdirSync(configFolder,{recursive:true})

		const localConfig = loadConfig(filePath)
		defaultValues ||= {}

		for (const key in defaultValues)
			assignDefault(localConfig,key,defaultValues[key])

		// write processed config.
		writeConfig(filePath,localConfig)
		return localConfig
	},
}
