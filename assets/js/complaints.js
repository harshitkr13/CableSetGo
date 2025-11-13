;(function () {
	const { $, $$, genTicketId } = window.CSG || {}
	if (!window.supabase || !$) return

	const form = $('#complaint-form')
	const statusEl = $('#complaint-status')

	function setStatus(msg) { if (statusEl) statusEl.textContent = msg || '' }

	async function submit(e) {
		e.preventDefault()
		const session = (await supabase.auth.getSession()).data.session
		if (!session) { location.href = 'auth.html'; return }
		const email = ($('#email')?.value || '').trim()
		const payload = {
			ticket_id: genTicketId(),
			user_id: session.user.id,
			email,
			type: $('#type').value,
			subject: $('#subject').value.trim(),
			message: $('#message').value.trim(),
			status: 'open',
			created_at: new Date().toISOString()
		}
		if (!payload.subject || !payload.message) return setStatus('Please fill subject and message.')
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus('Please provide a valid email.')
		setStatus('Creating ticket...')
		const { error } = await supabase.from('complaints').insert(payload)
		if (error) return setStatus(error.message)
		setStatus(`Ticket created: ${payload.ticket_id}. Verification email will be sent.`)
		// Send email via Edge Function (configure URL and CORS on server)
		try {
			if (window.CSG_ENV?.COMPLAINTS_EMAIL_FN_URL) {
				await fetch(window.CSG_ENV.COMPLAINTS_EMAIL_FN_URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${supabase.supabaseKey || ''}` },
					body: JSON.stringify({ ticketId: payload.ticket_id, userId: payload.user_id, email, subject: payload.subject, message: payload.message })
				})
			}
		} catch (_e) {
			// ignore email errors in UI
		}
		form.reset()
	}

	form && form.addEventListener('submit', submit)
})()


