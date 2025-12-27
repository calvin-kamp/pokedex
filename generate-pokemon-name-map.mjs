// generate-pokemon-name-map.mjs
import fs from 'node:fs'
import path from 'node:path'

const CONFIG = {
    concurrency: 8,
    retries: 5,
    backoffBaseMs: 500,
}

const LIST_URL = 'https://pokeapi.co/api/v2/pokemon-species?limit=2000'
const OUT_FILE = path.resolve('src/json/pokemon-name-map.json')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchJson(url, { retries = CONFIG.retries } = {}) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, {
                headers: { 'User-Agent': 'pokemon-name-map-generator' },
            })

            if (res.status === 429) {
                const retryAfter = Number(res.headers.get('retry-after') || '1')
                await sleep(retryAfter * 1000)
                continue
            }

            if (!res.ok) {
                throw new Error(`HTTP ${res.status} for ${url}`)
            }

            return await res.json()
        } catch (err) {
            if (attempt === retries) {
                throw err
            }

            const backoff = CONFIG.backoffBaseMs * (attempt + 1)
            await sleep(backoff)
        }
    }

    throw new Error(`Unreachable: fetchJson(${url})`)
}

async function runPool(items, worker, concurrency = CONFIG.concurrency) {
    const results = new Array(items.length)
    let index = 0

    async function runner() {
        while (index < items.length) {
            const currentIndex = index++
            results[currentIndex] = await worker(items[currentIndex], currentIndex)
        }
    }

    const runners = Array.from({ length: concurrency }, () => runner())
    await Promise.all(runners)
    return results
}

function pickName(names, lang) {
    const hit = (names || []).find((n) => n?.language?.name === lang)
    if (hit && typeof hit.name === 'string') {
        return hit.name
    }
    return null
}

async function main() {
    const list = await fetchJson(LIST_URL)
    const speciesRefs = list?.results || []

    const mapping = {
        meta: {
            generatedAt: new Date().toISOString(),
            source: 'https://pokeapi.co/',
            total: speciesRefs.length,
        },
        byId: {},
        bySlug: {},
    }

    let done = 0

    await runPool(
        speciesRefs,
        async (ref) => {
            const species = await fetchJson(ref.url)

            const id = species.id
            const slug = species.name

            const de = pickName(species.names, 'de')
            const en = pickName(species.names, 'en')

            mapping.byId[String(id)] = {
                slug,
                en: en ?? slug,
                de: de ?? slug,
            }

            mapping.bySlug[slug] = {
                id,
                en: en ?? slug,
                de: de ?? slug,
            }

            done++
            if (done % 50 === 0) {
                process.stderr.write(`Progress: ${done}/${speciesRefs.length}\n`)
            }

            return true
        },
        CONFIG.concurrency
    )

    fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
    fs.writeFileSync(OUT_FILE, JSON.stringify(mapping, null, 2), 'utf8')
    process.stderr.write(`Wrote: ${OUT_FILE}\n`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
