<script context="module">
    import * as api from "$lib/api.js";
    import { results } from "$lib/stores";

    export const load = async ({ params, stuff }) => {
        // load results for current age group
        const res = await api.get(`tournament/results?conditions={"competition.name":"${params.name}"}`);

        results.set([...res]);

        return {
            props: {
                tournament: stuff.tournament,
                name: params.name,
                section: params.section,
            },
        };
    };
</script>

<script>
    import ResultList from "$lib/ResultList.svelte";
    import LeagueTable from "$lib/LeagueTable.svelte";
    import Section from "$lib/Section.svelte";

    import Tab, { Label } from "@smui/tab";
    import Button from "@smui/button";
    import TabBar from "@smui/tab-bar";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    import moment from "moment-timezone";

    export let tournament, name, section;

    let active = "1";
    let otherComps = [];
    let competition = [];
    let groups = [];
    let groupResults = [];
    let koResults = [];
    let startTime, endTime;

    let time = (dateTime) => moment(dateTime).tz("Europe/London").format("HH:mm");
    let fixtureSort = (a, b) => {
        if (a.dateTime < b.dateTime) return -1;
        if (a.dateTime > b.dateTime) return 1;
        return a.tag < b.tag ? -1 : 1;
    };

    $: {
        otherComps = tournament.competitions.filter((c) => c.name === name && c.section !== section);
        competition = tournament.competitions.find((c) => c.name === name && c.section === section);

        let i = 1;
        groups = [];
        while (i <= competition.groups) groups.push("" + i++);
        if (parseInt(active) > groups.length) active = "1";

        groupResults = $results.filter(
            (r) => r.competition.name == name && r.competition.section == section && r.competition.group == parseInt(active)
        );
        groupResults.sort(fixtureSort);

        koResults = $results.filter(
            (r) => r.competition.name == name && r.competition.section == section && r.competition.group == undefined
        );
        koResults.sort(fixtureSort);

        startTime = groupResults.length > 0 ? time(groupResults[0].dateTime) : "";
        endTime =
            koResults.length > 0
                ? time(koResults[koResults.length - 1].dateTime + 900000)
                : groupResults.length > 0
                ? time(groupResults[groupResults.length - 1].dateTime + 900000)
                : "";
    }
</script>

<svelte:head>
    <title>{name} : {section} Section</title>
</svelte:head>

<Section fab={name} container={false}>
    <div slot="section-head">
        <h4>{section} Section</h4>
        <ul>
            <li>
                {groups.length} Groups {#if koResults.length > 0} with knock out games{/if}
            </li>
            <li>
                {#if startTime !== ""}
                    Starts on day {groupResults[0].day} at {startTime}, ends appx. {endTime}
                {:else}
                    No fixtures found for this section
                {/if}
            </li>
        </ul>

        {#if otherComps.length > 0}
            <p>
                Other sections for this age group:<br />

                {#each otherComps as { section }}
                    <Button class="header-link" href="/competition/{name}/{section}">{section}</Button>
                {/each}
            </p>
        {/if}
    </div>

    <div slot="section-body">
        <TabBar tabs={groups} let:tab bind:active>
            <Tab {tab} minWidth>
                <Label>GRP {tab}</Label>
            </Tab>
        </TabBar>

        {#if groupResults.length > 0}
            <LayoutGrid>
                <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
                    <LeagueTable bind:results={groupResults} />
                </Cell>
                <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
                    <ResultList bind:results={groupResults} />
                </Cell>
            </LayoutGrid>
        {/if}

        {#if groupResults.length == 0 && koResults.length == 0}
            <LayoutGrid>
                <Cell span={12}>
                    No games have been created in this group.
                </Cell>
            </LayoutGrid>
        {/if}
    </div>
</Section>

{#if koResults.length > 0}
    <Section container={false}>
        <div slot="section-head">
            <div class="content">
                <h5>KO Matches</h5>
            </div>
        </div>

        <div slot="section-body">
            <LayoutGrid>
                <Cell span={12}>
                    <ResultList bind:results={koResults} />
                </Cell>
            </LayoutGrid>
        </div>
    </Section>
{/if}

<style>
    ul,
    li {
        list-style: none inside;
        padding: 0;
        margin: 0;
    }

    * :global(.header-link) {
        color: inherit;
        border-bottom: 1px dotted var(--mdc-theme-on-primary, whitesmoke);
        text-decoration: none;
        text-transform: uppercase;
    }
</style>
