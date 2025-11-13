;(function () {
	const { $, $$, haversineKm } = window.CSG || {}
	if (!window.supabase || !$) return

	const listEl = $('#providers-list')
	const statusEl = $('#providers-status')
	const refreshBtn = $('#refresh')
	const searchInput = $('#search-text')

	function setStatus(msg) { if (statusEl) statusEl.textContent = msg || '' }

	async function fetchUserLocation() {
		const session = await supabase.auth.getSession()
		if (!session.data.session) return null
		const { data } = await supabase.from('profiles').select('lat,lng').eq('user_id', session.data.session.user.id).maybeSingle()
		return data || null
	}

	function renderProviders(items) {
		listEl.innerHTML = ''
		if (!items.length) return
		for (const p of items) {
			const card = document.createElement('div')
			card.className = 'csg-tile'
			card.innerHTML = `
				<h4>${p.name}</h4>
				<div class="csg-meta">${p.service || ''} • ${p.phone || ''}</div>
				<div class="csg-meta">${p.distanceKm != null ? p.distanceKm.toFixed(1) + ' km' : ''}</div>
			`
			listEl.appendChild(card)
		}
	}

	async function loadProviders() {
		setStatus('Loading providers...')
		const loc = await fetchUserLocation()
		const qText = (searchInput?.value || '').toLowerCase()
		// Fetch all providers; filter client-side by distance (needs PostGIS for server-side)
		const { data: providers, error } = await supabase.from('providers').select('*')
		if (error) return setStatus(error.message)
		let results = providers || []
		if (loc?.lat && loc?.lng) {
			results = results.map((p) => {
				if (p.lat != null && p.lng != null) {
					p.distanceKm = haversineKm(loc.lat, loc.lng, p.lat, p.lng)
				} else {
					p.distanceKm = null
				}
				return p
			})
			// Primary window: <= 5km
			let within5 = results.filter((p) => p.distanceKm != null && p.distanceKm <= 5)
			if (qText) within5 = within5.filter((p) => (p.name||'').toLowerCase().includes(qText) || (p.service||'').toLowerCase().includes(qText))
			within5.sort((a,b) => (a.distanceKm||999) - (b.distanceKm||999))
			if (within5.length) {
				renderProviders(within5)
				setStatus(`${within5.length} provider(s) within 5 km.`)
				return
			}
			// Expand to 15km
			let within15 = results.filter((p) => p.distanceKm != null && p.distanceKm <= 15)
			if (qText) within15 = within15.filter((p) => (p.name||'').toLowerCase().includes(qText) || (p.service||'').toLowerCase().includes(qText))
			within15.sort((a,b) => (a.distanceKm||999) - (b.distanceKm||999))
			if (within15.length) {
				renderProviders(within15)
				setStatus(`No one within 5 km. Showing ${within15.length} within 15 km.`)
				return
			}
			listEl.innerHTML = ''
			setStatus('No providers found within 15 km. We regret the inconvenience.')
		} else {
			// No location, show all providers basic list
			let base = results
			if (qText) base = base.filter((p) => (p.name||'').toLowerCase().includes(qText) || (p.service||'').toLowerCase().includes(qText))
			renderProviders(base)
			setStatus(`${base.length} provider(s). Enable location in profile for distance.`)
		}
	}

	refreshBtn && refreshBtn.addEventListener('click', loadProviders)
	searchInput && searchInput.addEventListener('input', () => {
		// Debounce simple
		clearTimeout(searchInput._t)
		searchInput._t = setTimeout(loadProviders, 250)
	})
	loadProviders()
})()


