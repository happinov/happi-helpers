
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
		const id = setInterval(callback.bind(this),value)
		this.on('before:detach', ()=> clearInterval(id))
		return id
	}

	function setTimeoutAutorelease(callback, value) {
		const id = setTimeout(callback.bind(this),value)
		this.on('before:detach', ()=> clearTimeout(id))
		return id
	}

	Marionette.View.prototype.ensureRendered = ensureRendered
	Marionette.View.prototype.ensureAttached = ensureAttached
	Marionette.View.prototype.setInterval = setIntervalAutorelease
	Marionette.View.prototype.setTimeout = setTimeoutAutorelease
	Marionette.CollectionView.prototype.ensureRendered = ensureRendered
	Marionette.CollectionView.prototype.ensureAttached = ensureAttached
	Marionette.CollectionView.prototype.setInterval = setIntervalAutorelease
	Marionette.CollectionView.prototype.setTimeout = setTimeoutAutorelease
}
