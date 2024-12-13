
const DEFAULT_CACHE_DURATION = 5*1000 // ms

function isNumber(value) {
	return typeof value === 'number'
}

class TimeCache {
	#cache = new Map()
	#timers = new Map()

	constructor(duration) {
		this.duration = duration ?? DEFAULT_CACHE_DURATION

		if (!isNumber(this.duration) || this.duration < 0)
			throw new Error(`Invalid duration: ${this.duration}`)
	}

	set(key,value) {
		this.#cache.set(key, value)
		this.#startTimer(key)
		return value
	}

	has(key) {
		return this.#cache.has(key)
	}

	get(key) {
		if (this.has(key)) {
			this.#startTimer(key)
			return this.#cache.get(key)
		}
	}

	clear(key) {
		clearTimeout(this.#timers.get(key))
		this.#timers.delete(key)
		this.#cache.delete(key)
	}

	#startTimer(key) {
		if (this.#timers.has(key))
			clearTimeout(this.#timers.get(key))

		this.#timers.set(key, setTimeout(()=> {
			this.clear(key)
		}, this.duration))
	}

	getGenerate(key,generator) {
		if (this.has(key))
			return this.get(key)

		return this.set(key,generator())
	}

	async getGeneratePromise(key,generator) {
		if (this.has(key))
			return this.get(key)

		return this.set(key,await generator())
	}
}

export default TimeCache
