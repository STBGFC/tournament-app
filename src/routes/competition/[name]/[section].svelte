<script>
    import ResultList from "$lib/ResultList.svelte";
    import LeagueTable from "$lib/LeagueTable.svelte";
	import AgeFab from '$lib/AgeFab.svelte';
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Paper, { Content } from '@smui/paper';
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

<svelte:head>
	<title>{name} : {section} Section</title>
</svelte:head>


<Paper class="paper" elevation={4}>
    <Content>              
        <h4>
            <AgeFab {name}/>
            '{section}' Section
        </h4>
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
<Paper class="paper" elevation={4}>
    <Content>              
        
        <LayoutGrid>
            <Cell span={12}>
                <h5>KO Matches</h5>        
                <ResultList bind:results={koResults}/>
            </Cell>
        </LayoutGrid>
        
    </Content>
</Paper>
{/if}

