;(function () {
	const list = document.getElementById('faq-list')
	if (!list) return
	const items = [
		{ q: 'How do I sign up?', a: 'Use your phone number on the Login/Register page to receive an OTP.' },
		{ q: 'How are providers shown?', a: 'We show nearby providers within 5 km, expanding to 15 km if needed.' },
		{ q: 'How do I raise a complaint?', a: 'Go to Complaints, submit the form, and you will get a ticket ID.' },
		{ q: 'How do I change language?', a: 'Use the language selector in the navbar.' }
	]
	list.innerHTML = items.map(i => `
		<div class="faq-item">
			<div class="q">${i.q}</div>
			<div class="a">${i.a}</div>
		</div>
	`).join('')
})()


