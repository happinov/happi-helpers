
function asArray(value) {
	if (Array.isArray(value))
		return value
	if (value != null)
		return [value]
	return []
}

function defer(callback) {
	setTimeout(callback,0)
}

export default ($)=> {
	$.fn.isChecked = function() {
		let result = true
		this.each(function() {result &&= this.checked})
		return result
	}

	$.fn.setChecked = function(value) {
		this.each(function() {
			this.checked = value ?? true

			// We must fire a change event because programmatically changing checkboxes doesn't do it natively.
			this.dispatchEvent(new Event('change',{
				target: this,
				srcElement: this,
			}))
		})
	}

	$.fn.setDisabled = function(value) {
		this.prop('disabled', !!value)
	}

	$.fn.replaceClass = function(removed,added) {
		this.each(function() {
			this.classList.remove(...asArray(removed))
			this.classList.add(...asArray(added))
		})
	}

	$.fn.setHidden = function(flag) {
		this.each(function (){
			this.classList.toggle('hidden',flag??true)
		})
	}

	$.fn.showFlex = function() {
		this.css('display','flex')
	}

	$.fn.selectedVal = function() {
		return this.first().find(':selected').val()
	}

	$.fn.scrollToBottom = function(duration) {
		this.each(function() {
			// defer execution to allow potential page update to be applied.
			defer(()=> {
				$(this).animate({scrollTop: this.scrollHeight},duration??200)
			})
		})
	}
}
