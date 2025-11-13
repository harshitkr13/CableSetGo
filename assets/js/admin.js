;(function () {
	const { $, $$ } = window.CSG || {}
	if (!window.supabase) return

	const usersEl = $('#admin-users')
	const providersEl = $('#admin-providers')
	const ticketsEl = $('#admin-tickets')
	const statusEl = $('#admin-status')

	function setStatus(msg) { if (statusEl) statusEl.textContent = msg || '' }

	function renderTable(el, rows, columns) {
		if (!el) return
		if (!rows || !rows.length) { el.innerHTML = '<div class="csg-meta">No data</div>'; return }
		const thead = `<thead><tr>${columns.map(c=>`<th style="text-align:left;padding:6px 8px;">${c}</th>`).join('')}</tr></thead>`
		const tbody = `<tbody>${rows.map(r=>`<tr>${columns.map(c=>`<td style="padding:6px 8px;border-top:1px solid #1a2538;">${r[c] != null ? String(r[c]) : ''}</td>`).join('')}</tr>`).join('')}</tbody>`
		el.innerHTML = `<table style="width:100%;border-collapse:collapse;">${thead}${tbody}</table>`
	}

	async function load() {
		setStatus('Loading...')
		const [{ data: users }, { data: providers }, { data: tickets }] = await Promise.all([
			supabase.from('profiles').select('user_id, full_name, phone, pincode, lat, lng, updated_at').limit(100),
			supabase.from('providers').select('id, name, service, phone, lat, lng').limit(100),
			supabase.from('complaints').select('ticket_id, user_id, type, subject, status, created_at').order('created_at', { ascending: false }).limit(100)
		])
		renderTable(usersEl, users || [], ['user_id', 'full_name', 'phone', 'pincode', 'lat', 'lng', 'updated_at'])
		renderTable(providersEl, providers || [], ['id', 'name', 'service', 'phone', 'lat', 'lng'])
		renderTable(ticketsEl, tickets || [], ['ticket_id', 'user_id', 'type', 'subject', 'status', 'created_at'])
		setStatus('')
	}

	load()
})()


