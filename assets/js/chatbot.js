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
			
			// Call Gemini API
			const apiKey = window.CSG_ENV?.GEMINI_API_KEY || ''
			if (!apiKey) {
				thinking.remove()
				push('bot', 'Gemini API key not configured. Please check your configuration.')
				state.busy = false
				return
			}

			const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					contents: [{
						parts: [{
							text: `You are a helpful assistant for CableSetGo, a cable TV service platform. Help users with questions about plans, payments, service availability, complaints, and general support. Be friendly and concise. User question: ${text}`
						}]
					}]
				})
			})

			if (!response.ok) {
				const errorText = await response.text()
				let errorMessage = `API error: ${response.status}`
				try {
					const errorData = JSON.parse(errorText)
					errorMessage = errorData.error?.message || errorMessage
					console.error('API Error details:', errorData)
				} catch (parseErr) {
					console.error('Error response:', errorText)
				}
				throw new Error(errorMessage)
			}

			const data = await response.json()
			console.log('API Response:', data)
			
			// Handle different response structures
			let reply = null
			if (data.candidates && data.candidates[0]) {
				reply = data.candidates[0].content?.parts?.[0]?.text
			} else if (data.text) {
				reply = data.text
			}
			
			if (!reply) {
				console.error('Unexpected response structure:', data)
				reply = "I'm having trouble processing that. Could you please rephrase your question?"
			}
			
			thinking.remove()
			push('bot', reply)
		} catch (e) {
			thinking.remove()
			const errorMsg = e.message || 'Unknown error'
			push('bot', `Sorry, I encountered an error: ${errorMsg}. Please check the console for details.`)
			console.error('Gemini API error:', e)
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


