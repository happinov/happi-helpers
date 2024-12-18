
import _ from 'lodash'
import UserError from './userError.mjs'
import wait from './wait.mjs'

export default {
	enableRegisterService(log) {
		return function(socket, next) {
			socket.registerService = function(eventName,callback) {
				if (!_.isFunction(callback))
					throw new Error(`Cannot register service without callback: ${eventName}`)

				socket.on(eventName, async (...args)=> {
					let doneCallback = null

					if (_.isFunction(_.last(args)))
						doneCallback = args.pop() // remove callback from arg list
					else
						doneCallback = _.noop

					try {
						let result = await callback(...args)

						if (_.isFunction(result?.emit)) {
							log.warn(`Received socket result for service: ${eventName}`)
							result = null // then it's probably a socket object.
						} else if (_.isFunction(result)) {
							log.warn(`Service result is a function: ${eventName}`)
							result = null
						}

						await wait()
						doneCallback(null,result)
					} catch(err) {
						if (!UserError.isUserError(err))
							log.error(`Error during ${eventName}:`,err)
						let details = undefined

						// only send error codes to client
						if (_.isString(err?.code) && err?.details) {
							details = err.details
							err = err.code
						} else if (UserError.isUserError(err)) {
							details = err.details
							err = err.message
						} else {
							err = 'ERROR'
						}

						_.defer(()=> doneCallback(err,details))
					}
				})
			}

			socket.registerMultipleServices = function(mapping) {
				for (const name in mapping)
					socket.registerService(name,mapping[name])
			}

			next?.()
		}
	},
}
