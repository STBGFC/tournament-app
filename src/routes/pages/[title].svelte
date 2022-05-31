<script context="module">
    import * as api from "$lib/api.js";

    export const load = async ({ params }) => {
        const infoPage = (await api.get(`tournament/pages?conditions={"title":"${params.title}"}`))[0];

        return infoPage
            ? {
                  props: {
                      infoPage: infoPage,
                  },
                  cache: {
                      maxage: 3600,
                  },
              }
            : {
                  status: 404,
              };
    };
</script>

<script>
    import moment from "moment-timezone";
    import Section from "$lib/Section.svelte";
    import { marked } from "marked";

    export let infoPage;
</script>

<Section fab="icon:bookmark" container={true}>
    <div slot="section-head">
        <h4>{infoPage.title}</h4>
        created: {moment(infoPage.created).tz("Europe/London").format("DD MMM yyyy, HH:mm")}
    </div>

    <div slot="section-body">
        {@html marked(infoPage.body)}
    </div>
</Section>

<style>
    * :global(h2) {
        font-size: x-large;
    }
    * :global(h3) {
        font-size: large;
        font-weight: bold;
    }
</style>
