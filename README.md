# JusticeConnectAI

## Local Groq Proxy & Environment variables

1. Copy `.env.example` to `.env` and fill in your keys (do not commit `.env`).

	```bash
	cp .env.example .env
	# edit .env
	```

2. Install dependencies and run the local proxy server (this requires Node 18+ for ESM support):

	```bash
	npm install
	npm run proxy
	```

3. In the mobile app, set `PROXY_URL` to the running proxy address (e.g., `http://192.168.x.x:3000/groq` if using a physical device).  Android emulator may use `10.0.2.2` as the host.

4. Start the app as usual with:

	```bash
	npm run start
	```

This app supports both direct calls to Groq (not recommended for production) and a local proxy that secures the API key.
