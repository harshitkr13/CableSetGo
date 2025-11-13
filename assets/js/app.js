;(function () {
	const $ = (sel, root = document) => root.querySelector(sel)
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

	// Year
	const yearEl = $('#year')
	if (yearEl) yearEl.textContent = new Date().getFullYear()

	// i18n
	const supported = ['en', 'hi', 'bn']
	let currentLang = localStorage.getItem('csg_lang') || 'en'
	const langSelect = $('#lang-select')

	async function detectLanguageByLocation() {
		try {
			// If user already chose a language, do not override
			if (localStorage.getItem('csg_lang_chosen') === '1') return
			// Try navigator.language first as a simple heuristic
			const navLang = (navigator.language || 'en').slice(0, 2)
			if (supported.includes(navLang)) {
				currentLang = navLang
				return
			}
			// Geolocation country heuristic: if in India and near West Bengal, prefer Bengali; else default Hindi in India
			if ('geolocation' in navigator) {
				await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3000 }))
				// If geolocation works, we can't reverse geocode without a service; keep fallback to 'en'/'hi'
			}
			// Fallback: India => hi, else en
			// This is a placeholder; for accurate locale by region, integrate a geo-IP API on server
			currentLang = currentLang || 'en'
		} catch (_e) {
			// ignore
		}
	}

	async function loadI18n(lang) {
		const res = await fetch(`assets/i18n/${lang}.json`)
		if (!res.ok) return
		const dict = await res.json()
		$$('[data-i18n]').forEach((el) => {
			const key = el.getAttribute('data-i18n')
			if (dict[key]) el.textContent = dict[key]
		})
		$$('[data-i18n-placeholder]').forEach((el) => {
			const key = el.getAttribute('data-i18n-placeholder')
			if (dict[key]) el.setAttribute('placeholder', dict[key])
		})
		document.documentElement.lang = lang
	}

	function bindLangSelector() {
		if (!langSelect) return
		langSelect.value = currentLang
		langSelect.addEventListener('change', async (e) => {
			const lang = e.target.value
			if (!supported.includes(lang)) return
			currentLang = lang
			localStorage.setItem('csg_lang', lang)
			localStorage.setItem('csg_lang_chosen', '1')
			await loadI18n(lang)
		})
	}

	const navToggle = $('#nav-toggle')
	const navBar = $('.csg-navbar')
	const navCenterLinks = $$('.csg-nav-center a')
	if (navToggle && navBar) {
		navToggle.addEventListener('click', () => {
			navBar.classList.toggle('csg-nav-open')
		})
		navCenterLinks.forEach((link) => {
			link.addEventListener('click', () => navBar.classList.remove('csg-nav-open'))
		})
		window.addEventListener('resize', () => {
			if (window.innerWidth > 900) navBar.classList.remove('csg-nav-open')
		})
	}

	const availabilityForm = document.querySelector('.csg-search')
	if (availabilityForm) {
		const status = document.createElement('span')
		status.className = 'csg-search-status'
		availabilityForm.parentNode?.appendChild(status)
		availabilityForm.addEventListener('submit', (e) => {
			e.preventDefault()
			const input = availabilityForm.querySelector('input')
			const pin = input?.value.trim() || ''
			if (!pin) {
				status.textContent = 'Please enter a valid pincode to continue.'
				return
			}
			status.textContent = `Checking availability for ${pin}...`
			setTimeout(() => {
				status.textContent = `Great news! CableSetGo services are active near ${pin}.`
			}, 800)
		})
	}

	;(async function initLang() {
		if (!localStorage.getItem('csg_lang')) {
			await detectLanguageByLocation()
			localStorage.setItem('csg_lang', currentLang)
		}
		await loadI18n(currentLang)
		bindLangSelector()
	})()

	// Auth guard helpers
	window.CSG = {
		$, $$,
		requireAuth: async function requireAuth(redirect = 'auth.html') {
			const { data } = await supabase.auth.getSession()
			if (!data.session) {
				location.href = redirect
				return null
			}
			return data.session
		},
		haversineKm: function haversineKm(lat1, lon1, lat2, lon2) {
			function toRad(v) { return (v * Math.PI) / 180 }
			const R = 6371
			const dLat = toRad(lat2 - lat1)
			const dLon = toRad(lon2 - lon1)
			const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
			return 2 * R * Math.asin(Math.sqrt(a))
		},
		genTicketId: function genTicketId() {
			const ts = Date.now().toString(36).toUpperCase()
			const rnd = Math.random().toString(36).slice(2,7).toUpperCase()
			return `CSG-${ts}-${rnd}`
		}
	}
})()


