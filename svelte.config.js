import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
    preprocess: preprocess(),

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",
        adapter: node(),

        vite: {
            resolve: {
                alias: {
                    "xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js",
                },
            },
        },
    },
};

export default config;
