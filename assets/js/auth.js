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

	// Store OTP for verification
	let generatedOtp = null

	async function handleSendOtp(e) {
		e.preventDefault()
		if (busy) return
		const dial = dialInput.value.trim() || '+91'
		const phone = phoneInput.value.trim()
		const full = normalisePhone(dial, phone)
		if (!full) return setStatus('Enter valid country code and phone number.')
		busy = true
		setStatus('Sending OTP...')
		
		// Generate a random 6-digit OTP for demo
		generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
		
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 1000))
		
		// Show OTP in popup/alert
		alert(`Demo OTP for ${full}:\n\nYour OTP is: ${generatedOtp}\n\n(For demo purposes only)`)
		
		busy = false
		lastPhone = full
		otpSentAt = Date.now()
		hide(phoneForm)
		show(otpForm)
		setStatus('OTP sent. Please check the popup message.')
	}

	async function handleVerifyOtp(e) {
		e.preventDefault()
		if (busy) return
		if (!lastPhone || !generatedOtp) return setStatus('Please request an OTP first.')
		const code = otpInput.value.trim()
		if (!validateOtp(code)) return setStatus('Enter the 6-digit OTP you received.')
		busy = true
		setStatus('Verifying...')
		
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 800))
		
		// Verify OTP locally for demo
		if (code === generatedOtp) {
			busy = false
			setStatus('Verified. Redirecting...')
			// Store demo session in localStorage
			localStorage.setItem('csg_demo_auth', JSON.stringify({
				phone: lastPhone,
				authenticated: true,
				timestamp: Date.now()
			}))
			setTimeout(() => { location.href = 'profile.html' }, 600)
		} else {
			busy = false
			setStatus('Invalid OTP. Please try again.')
		}
	}

	function handleResend() {
		const elapsed = (Date.now() - otpSentAt) / 1000
		if (elapsed < 30) return setStatus(`Wait ${Math.ceil(30 - elapsed)}s before resending.`)
		// Generate new OTP and show in popup
		generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
		alert(`Demo OTP for ${lastPhone}:\n\nYour new OTP is: ${generatedOtp}\n\n(For demo purposes only)`)
		otpSentAt = Date.now()
		setStatus('New OTP sent. Please check the popup message.')
		otpInput.value = '' // Clear the input field
	}

	phoneForm && phoneForm.addEventListener('submit', handleSendOtp)
	otpForm && otpForm.addEventListener('submit', handleVerifyOtp)
	resendBtn && resendBtn.addEventListener('click', handleResend)
})()


