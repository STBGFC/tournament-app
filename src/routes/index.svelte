<script>
	import { tournament } from '$lib/db';
	import List, {
		Item,
		Graphic,
		Meta,
		Text,
		PrimaryText,
		SecondaryText,
	} from '@smui/list';
	import { goto } from '$app/navigation';
</script>

<div class="jumbotron">
	<h1 class="mdc-typography--headline2">{$tournament.name}</h1>
	<blockquote>
		<p>{$tournament.description}</p>
		<p><em>Select a competition below to view results and fixtures</em></p>
	</blockquote>
</div>

<div>
	<List
	  class="competition-list"
	  twoLine
	  avatarList
	  singleSelection
	>
		{#each $tournament.competitions as comp}	
		<Item
		  on:SMUI:action={() => goto(`/competition/${comp.name}/${comp.section}`)}
		  disabled={false}
		>
		
        <Graphic
          style="background-image: url(https://place-hold.it/40x40/a00/fff/ccc?text={comp.name}&fontsize=14);"
        />
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
	.jumbotron {
		background-image: url("/images/badge-icon.png");
		background-size: 6rem;
		background-position: top right;
		background-repeat: no-repeat;
		/* color: var(--mdc-theme-text-secondary-on-dark); */
		max-width: 80%;
	}
	
	@media (max-width: 767px) {
		.jumbotron {
			background-size: 4rem;
			max-width: 100%;
		}
	}

	blockquote {
		font-weight: normal;
    	font-style: italic;
		padding-left: 12px;
		border-left: 5px solid var( --mdc-theme-primary);
		margin: 10px;
	}

	* :global(.competition-list) {
		width: 100%;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.9));
	}
</style>