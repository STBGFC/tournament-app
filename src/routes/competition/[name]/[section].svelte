<script>
    import ResultList from "$lib/ResultList.svelte";
    import LeagueTable from "$lib/LeagueTable.svelte";
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import { tournament, results } from '$lib/db';
    import { page } from "$app/stores";

    const { name, section } = $page.params;

    let competition = $tournament.competitions.find(
      competition =>
      competition.name === name &&
      competition.section === section
    )

    let groups = [];
    let i = 1;
    while (i <= competition.groups) groups.push('' + i++);
    let active = '1';

    let groupResults = [];
    let koResults = [];

    koResults = $results.filter(
        result => 
        result.competition.name == name && result.competition.section == section && result.competition.group == undefined
    );

    $: {
        groupResults = $results.filter(
            result => 
            result.competition.name == name && result.competition.section == section && result.competition.group == parseInt(active)
        );
    }

</script>

<h1>{name} / {section}</h1>

<div>
<TabBar tabs={groups} let:tab bind:active>
    <Tab {tab} minWidth>
        <Label>Grp {tab}</Label>
    </Tab>
</TabBar>

<LeagueTable bind:results={groupResults}/>
<ResultList bind:results={groupResults}/>
</div>

<h2>KO Section</h2>
<ResultList bind:results={koResults}/>
