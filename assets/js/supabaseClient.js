// Initialize Supabase client. Fill values in assets/js/sysenv.example.js or set window.CSG_ENV before loading this file.
;(function () {
	if (!window.CSG_ENV) {
		console.warn('CSG_ENV not set. Create assets/js/sysenv.js from sysenv.example.js');
		window.CSG_ENV = { SUPABASE_URL: '', SUPABASE_ANON_KEY: '' }
	}
	const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.CSG_ENV
	if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
		console.warn('Supabase URL/Anon key missing. Auth and DB will not work until configured.')
	}
	window.supabase = window.supabase || supabase.createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '')
})()


