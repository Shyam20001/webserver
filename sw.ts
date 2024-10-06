// To support types
// https://github.com/microsoft/TypeScript/issues/14877
declare const self: ServiceWorkerGlobalScope

import { Hono } from 'hono'
import { handle } from 'hono/service-worker'
// PAGES
import home from './pages/Home'
import mycomp from './pages/Mypage'
const app = new Hono().basePath('/sw')
app.get('/', (c) => c.text('Hello World'))
app.get('/poda', (c) => c.json({ msg: `poda punda` }, 200))
app.route('/home', home)
app.route('/search', mycomp)

// Handler for POST request to handle form submission
app.post('/data', async (c) => {
    const formData = await c.req.parseBody();
    const searchTerm = formData.data; // The search term from the input

    // Perform a search using the DuckDuckGo API
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(searchTerm)}&format=json`);

    if (!response.ok) {
        return c.text('Error fetching search results', 500);
    }

    const results = await response.json();

    // Extract the relevant results from the DuckDuckGo response
    const searchResults = results.RelatedTopics.map(topic => topic.Text).join('\n');

    // Return the search results as plain text
    return c.text(searchResults || 'No results found');
});

self.addEventListener('fetch', handle(app))