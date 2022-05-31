<script context="module">
    import * as api from "$lib/api.js";

    export const load = async () => {
        return {
            props: {
                items: await api.get(`tournament/news`),
            },
            cache: {
                maxage: 3600,
            },
        };
    };
</script>

<script>
    import moment from "moment-timezone";
    import Section from "$lib/Section.svelte";
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    export let items;

    let time = (dateTime) => moment(dateTime).tz("Europe/London").format("dddd, HH:mm");
</script>

<Section fab="icon:feed" container={true}>
    <div slot="section-head">
        <h4>News</h4>
        Updates and announcements made during the tournament
    </div>

    <div slot="section-body">
        <div class="accordion-container">
            <Accordion>
                {#each items as item}
                    <Panel>
                        <Header>
                            {item.title}
                            <span slot="description"><small>{time(item.created)}</small></span>
                        </Header>
                        <Content>{item.body}</Content>
                    </Panel>
                {/each}
            </Accordion>
        </div>
    </div>
</Section>
