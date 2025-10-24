
export default (Marionette)=> {
	function ensureRendered() {
		return new Promise((resolve)=> {
			if (this.isRendered())
				resolve()
			else
				this.once('render', resolve)
		})
	}

	function ensureAttached() {
		return new Promise((resolve)=> {
			if (this.isAttached())
				resolve()
			else
				this.once('attach', resolve)
		})
	}

	function setIntervalAutorelease(callback, value) {
		const id = setInterval(callback,value)
		this.on('before:detach', ()=> clearInterval(id))
		return id
	}

	function setTimeoutAutorelease(callback, value) {
		const id = setTimeout(callback,value)
		this.on('before:detach', ()=> clearTimeout(id))
		return id
	}

	function waitAutorelease(duration) {
		return new Promise((resolve)=> {
			this.setTimeout(resolve, duration ?? 0)
		})
	}

	Marionette.View.prototype.ensureRendered = ensureRendered
	Marionette.View.prototype.ensureAttached = ensureAttached
	Marionette.View.prototype.setInterval = setIntervalAutorelease
	Marionette.View.prototype.setTimeout = setTimeoutAutorelease
	Marionette.View.prototype.wait = waitAutorelease
	Marionette.CollectionView.prototype.ensureRendered = ensureRendered
	Marionette.CollectionView.prototype.ensureAttached = ensureAttached
	Marionette.CollectionView.prototype.setInterval = setIntervalAutorelease
	Marionette.CollectionView.prototype.setTimeout = setTimeoutAutorelease
	Marionette.CollectionView.prototype.wait = waitAutorelease
}
