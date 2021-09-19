<script>
	import AgeFab from '$lib/AgeFab.svelte';
	import { tournament } from '$lib/db';
	
	import { goto } from '$app/navigation';

	import List, {
		Item,
		Meta,
		Text,
		PrimaryText,
		SecondaryText,
	} from '@smui/list';
    import Paper, { Content } from '@smui/paper';
</script>


<div class="jumbotron">
	<h1>{$tournament.name}</h1>
	<blockquote>
		<p>{$tournament.description}</p>
		<p style="font-size: smaller"><em>Select a competition below to view results and fixtures</em></p>
	</blockquote>
</div>

<Paper class="paper" elevation={4}>
	<Content>    
		<div class="list-container">
			<List
				class="competition-list"
				twoLine
				avatarList
				singleSelection
				>
				{#each $tournament.competitions as comp}	
				<Item on:SMUI:action={() => goto(`/competition/${comp.name}/${comp.section}`)}>
					<AgeFab name={comp.name}/>
					<Text>
						<PrimaryText>{comp.name}</PrimaryText>
						<SecondaryText>{comp.section}</SecondaryText>
					</Text>
					<Meta class="material-icons">sports_soccer</Meta>
				</Item>
				{/each}
			</List>
		</div>
	</Content>
</Paper>


<style>
	.jumbotron {
		background-image: url("/images/badge-icon.png");
		background-size: 7rem;
		background-position: top right;
		background-repeat: no-repeat;
		max-width: 80%;
		margin-top: 30px;
	}
	.list-container {
		width: 100%;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.9));
		height: 400px;
		overflow-y: auto;
		overflow-x: hidden;
	}
	
	@media (max-width: 600px) {
		.jumbotron {
			background-size: 5rem;
			max-width: 100%;
		}
	}

	blockquote {
		font: normal italic larger Arial;
		line-height: 1.5em;
		padding-left: 12px;
		border-left: 5px solid var( --mdc-theme-primary);
		margin: 10px;
		max-width: 75%;
	}
	
	* :global(.competition-list) {
		width: 100%;
	}
</style>