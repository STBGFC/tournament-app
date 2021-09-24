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
</script>

<div class="section-head">
	<h1>{$tournament.name}</h1>
	<blockquote>
		<p>{$tournament.description}</p>
		<p style="font-size: smaller"><em>Select a competition below to view results and fixtures</em></p>
	</blockquote>
</div>

<div class="section-body">
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


<style>
	.section-head {
		background-origin: content-box;
		background-image: url("/icons/icon-512x512.png");
		background-size: 7rem;
		background-position: top right;
		background-repeat: no-repeat;
	}
	
	@media (max-width: 600px) {
		.section-head {
			background-size: 5rem;
			max-width: 100%;
		}
	}

	blockquote {
		max-width: 70%;
		font: normal italic larger Arial;
		line-height: 1.5em;
		padding-left: 12px;
		border-left: 5px solid var( --mdc-theme-primary);
	}

	.section-head h1 {
		max-width: 82%;
	}
	
	* :global(.competition-list) {
		width: 100%;		
	}
</style>