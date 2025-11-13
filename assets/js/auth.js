;(function () {
	const { $, $$ } = window.CSG || {}
	if (!window.supabase || !$) return

	const phoneForm = $('#phone-form')
	const otpForm = $('#otp-form')
	const statusEl = $('#auth-status')
	const resendBtn = $('#resend-otp')
	const dialInput = $('#dial')
	const phoneInput = $('#phone')
	const otpInput = $('#otp')

	let lastPhone = null
	let otpSentAt = 0
	let busy = false

	function setStatus(msg) {
		if (statusEl) statusEl.textContent = msg || ''
	}
	function show(el) { el && el.classList.remove('csg-hide') }
	function hide(el) { el && el.classList.add('csg-hide') }

	function normalisePhone(dial, phone) {
		const dialDigits = dial.replace(/[^\d+]/g, '')
		if (!/^\+\d{1,4}$/.test(dialDigits)) return null
		const localDigits = phone.replace(/\D/g, '')
		if (localDigits.length < 6 || localDigits.length > 12) return null
		return `${dialDigits}${localDigits}`
	}

	function validateOtp(code) {
		return /^\d{4,8}$/.test(code)
	}

	async function handleSendOtp(e) {
		e.preventDefault()
		if (busy) return
		const dial = dialInput.value.trim() || '+91'
		const phone = phoneInput.value.trim()
		const full = normalisePhone(dial, phone)
		if (!full) return setStatus('Enter valid country code and phone number.')
		busy = true
		setStatus('Sending OTP...')
		console.log(full)
		const { error } = await supabase.auth.signInWithOtp({ phone: full, channel: 'sms' })
		busy = false
		if (error) return setStatus(error.message)
		lastPhone = full
		otpSentAt = Date.now()
		hide(phoneForm)
		show(otpForm)
		setStatus('OTP sent. Please check your phone.')
	}

	async function handleVerifyOtp(e) {
		e.preventDefault()
		if (busy) return
		if (!lastPhone) return setStatus('Please request an OTP first.')
		const code = otpInput.value.trim()
		if (!validateOtp(code)) return setStatus('Enter the 6-digit OTP you received.')
		busy = true
		setStatus('Verifying...')
		const { data, error } = await supabase.auth.verifyOtp({ phone: lastPhone, token: code, type: 'sms' })
		busy = false
		if (error) return setStatus(error.message)
		setStatus('Verified. Redirecting...')
		setTimeout(() => { location.href = 'profile.html' }, 600)
	}

	function handleResend() {
		const elapsed = (Date.now() - otpSentAt) / 1000
		if (elapsed < 30) return setStatus(`Wait ${Math.ceil(30 - elapsed)}s before resending.`)
		show(phoneForm)
		hide(otpForm)
		setStatus('Resending OTP...')
		phoneForm.dispatchEvent(new Event('submit', { cancelable: true }))
	}

	phoneForm && phoneForm.addEventListener('submit', handleSendOtp)
	otpForm && otpForm.addEventListener('submit', handleVerifyOtp)
	resendBtn && resendBtn.addEventListener('click', handleResend)
})()


