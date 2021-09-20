<script>
    import ResultList from "$lib/ResultList.svelte";
    import LeagueTable from "$lib/LeagueTable.svelte";
	import AgeFab from '$lib/AgeFab.svelte';
    import { tournament, results } from '$lib/db';
    
    import { page } from "$app/stores";

    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Paper, { Content } from '@smui/paper';

    import moment from "moment";


    const { name, section } = $page.params;

    let otherComps = $tournament.competitions.filter( c => c.name === name && c.section !== section );
    let competition = $tournament.competitions.find( c => c.name === name && c.section === section );

    let groups = [];
    let i = 1;
    while (i <= competition.groups) groups.push('' + i++);
    let active = '1';

    let groupResults = [];
    let koResults = [];

    let time = (dateTime) => moment(dateTime).tz('Europe/London').format('HH:mm');
    let startTime, endTime;

    $: {
        groupResults = $results.filter(
            r => 
            r.competition.name == name && r.competition.section == section && r.competition.group == parseInt(active)
        );

        koResults = $results.filter(
            r => 
            r.competition.name == name && r.competition.section == section && r.competition.group == undefined
        );

        startTime = (groupResults.length > 0) ? time(groupResults[0].dateTime) : '';
        endTime = (koResults.length > 0) ? 
            time(koResults[koResults.length - 1].dateTime + 900000) : 
            (groupResults.length > 0) ? 
                time(groupResults[groupResults.length - 1].dateTime + 900000) : 
                ''
    }

</script>

<svelte:head>
	<title>{name} : {section} Section</title>
</svelte:head>

 
<div class="section-head">
    <AgeFab {name}/>
    <div class="content">
        <h4>{section} Section</h4>
        <ul>
            <li>
                {groups.length} Groups {#if koResults.length > 0} with knock out games{/if}
            </li>
            <li>
                {#if startTime !== ''}
                Starts on day {groupResults[0].day} at {startTime}, ends appx. {endTime}
                {:else}
                No fixtures found for this section
                {/if}
            </li>
        </ul>
        
        {#if otherComps.length > 0}
        <p>
            Other sections for this age group: |
            {#each otherComps as {section}}
            <a href="/competition/{name}/{section}">{section}</a> |&nbsp;
            {/each}
        </p>
        {/if}
    </div>
</div>

<Paper class="paper" elevation={4}>
    <Content>   
        <TabBar tabs={groups} let:tab bind:active>
            <Tab {tab} minWidth>
                <Label>Grp {tab}</Label>
            </Tab>
        </TabBar>
        
        <LayoutGrid>
            <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
                <LeagueTable bind:results={groupResults}/>
            </Cell>
            <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
                <ResultList bind:results={groupResults}/>
            </Cell>
        </LayoutGrid>

    </Content>
</Paper>

{#if koResults.length > 0}
<div class="section-head">
    <div class="content">
        <h5>KO Matches</h5>        
    </div>
</div>
<Paper class="paper" elevation={4}>
    <Content>              
        
        <LayoutGrid>
            <Cell span={12}>
                <ResultList bind:results={koResults}/>
            </Cell>
        </LayoutGrid>
        
    </Content>
</Paper>
{/if}

<style>
    .section-head {
        padding: 40px 15px;
        color: whitesmoke;        
        color: var(--mdc-theme-on-primary);        
        background-color: #333;
        background-color: var(--mdc-theme-text-icon-on-light);
    }

    * :global(.mdc-fab) {
        float: left;
    }

    .section-head .content {
        margin-left: 90px;
    }

    .section-head .content a {
        color: #f5f5f5;
        border-bottom: 1px dotted #f5f5f5;
        text-decoration: none;
        text-transform: uppercase;
    }

    ul, li {
        list-style: none inside;
        padding: 0;
        margin: 0;
    }
</style>