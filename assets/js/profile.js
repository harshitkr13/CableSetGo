;(function () {
	const { $, $$ } = window.CSG || {}
	if (!window.supabase || !$) return

	const form = $('#profile-form')
	const statusEl = $('#profile-status')
	const detectBtn = $('#detect-location')

	function setStatus(msg) { if (statusEl) statusEl.textContent = msg || '' }

	async function init() {
		const session = await CSG.requireAuth()
		if (!session) return
		$('#phone').value = session.user.phone || ''
		// Load profile if exists
		const { data, error } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).maybeSingle()
		if (!error && data) {
			$('#fullName').value = data.full_name || ''
			$('#address').value = data.address || ''
			$('#pincode').value = data.pincode || ''
			$('#lat').value = data.lat || ''
			$('#lng').value = data.lng || ''
		}
	}

	function detect() {
		if (!navigator.geolocation) return setStatus('Geolocation not available.')
		setStatus('Detecting location...')
		navigator.geolocation.getCurrentPosition((pos) => {
			$('#lat').value = pos.coords.latitude.toFixed(6)
			$('#lng').value = pos.coords.longitude.toFixed(6)
			setStatus('Location detected.')
		}, () => setStatus('Unable to detect location.'))
	}

	async function save(e) {
		e.preventDefault()
		const session = (await supabase.auth.getSession()).data.session
		if (!session) return
		const payload = {
			user_id: session.user.id,
			phone: session.user.phone || '',
			full_name: $('#fullName').value.trim(),
			address: $('#address').value.trim(),
			pincode: $('#pincode').value.trim(),
			lat: parseFloat($('#lat').value) || null,
			lng: parseFloat($('#lng').value) || null,
			updated_at: new Date().toISOString()
		}
		setStatus('Saving...')
		const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'user_id' })
		if (error) return setStatus(error.message)
		setStatus('Saved. Redirecting...')
		setTimeout(() => { location.href = 'landing.html' }, 600)
	}

	form && form.addEventListener('submit', save)
	detectBtn && detectBtn.addEventListener('click', detect)
	init()
})()


