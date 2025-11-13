;(function () {
	// Minimal Gemini chat shell with enforced 1-minute delay between user messages
	const root = document.getElementById('chatbot-root')
	if (!root) return
	const state = { lastSentAt: 0, busy: false, messages: [] }
	root.innerHTML = `
		<div class="csg-bot">
			<div class="csg-bot-header">
				<div>Assistant (Gemini)</div>
				<button id="csg-bot-clear" class="csg-btn csg-btn-link">Clear</button>
			</div>
			<div id="csg-bot-body" class="csg-bot-body"></div>
			<div class="csg-bot-input">
				<input id="csg-bot-input" placeholder="Ask something..." />
				<button id="csg-bot-send" class="csg-btn csg-btn-primary">Send</button>
			</div>
		</div>
	`
	const body = document.getElementById('csg-bot-body')
	const input = document.getElementById('csg-bot-input')
	const sendBtn = document.getElementById('csg-bot-send')
	const clearBtn = document.getElementById('csg-bot-clear')

	function push(role, text) {
		state.messages.push({ role, text })
		const div = document.createElement('div')
		div.className = `csg-msg ${role === 'user' ? 'user' : 'bot'}`
		div.textContent = text
		body.appendChild(div)
		body.scrollTop = body.scrollHeight
	}

	async function delayOneMinute() {
		const now = Date.now()
		const delta = now - state.lastSentAt
		const remaining = 60000 - delta
		if (remaining > 0) {
			await new Promise((r) => setTimeout(r, remaining))
		}
	}

	async function send() {
		const text = (input.value || '').trim()
		if (!text || state.busy) return
		state.busy = true
		const since = Date.now() - state.lastSentAt
		if (since < 60000) {
			const waitSec = Math.ceil((60000 - since) / 1000)
			push('bot', `Please wait ${waitSec}s before the next message (rate limit).`)
			state.busy = false
			return
		}
		push('user', text)
		input.value = ''
		state.lastSentAt = Date.now()

		// Simulate "thinking" dot
		const thinking = document.createElement('div')
		thinking.className = 'csg-msg bot'
		thinking.textContent = 'Thinking...'
		body.appendChild(thinking)
		body.scrollTop = body.scrollHeight

		try {
			// Enforce 1-minute delay per chat
			await delayOneMinute()
			// If you want real Gemini, include the Google Generative AI client and call it here.
			// Placeholder deterministic echo for now (to avoid exposing keys in client)
			const reply = `Thanks for your message: "${text}". (Gemini response placeholder)`
			thinking.remove()
			push('bot', reply)
		} catch (e) {
			thinking.remove()
			push('bot', 'Error getting response.')
		} finally {
			state.busy = false
		}
	}

	function clearChat() {
		state.messages = []
		body.innerHTML = ''
	}

	sendBtn.addEventListener('click', send)
	input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send() })
	clearBtn.addEventListener('click', clearChat)
})()


