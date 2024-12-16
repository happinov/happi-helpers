
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

	Marionette.View.prototype.ensureRendered = ensureRendered
	Marionette.View.prototype.ensureAttached = ensureAttached
	Marionette.CollectionView.prototype.ensureRendered = ensureRendered
	Marionette.CollectionView.prototype.ensureAttached = ensureAttached
}
