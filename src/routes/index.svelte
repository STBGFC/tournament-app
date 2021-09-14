<script>
	import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Button, { Label } from '@smui/button';
	import { tournament } from '$lib/db';
import { component_subscribe } from 'svelte/internal';

	export const title = 'Welcome';

</script>

<blockquote>
	<h1>{$tournament.name}</h1>
	<p>{$tournament.description}</p>
	<footer>Select a competition below to view results and fixtures</footer>
</blockquote>

<div id="competitions">
	<LayoutGrid>
	{#each $tournament.competitions as comp}
		<Cell span={2}>
			<div class="button-cell">
				<a href="/app/competition/{comp.name}/{comp.section}">
					<Button variant="raised">
						<Label>{comp.name} / {comp.section}</Label>
					</Button>
				</a>
			</div>	
		</Cell>		
	{/each}
	</LayoutGrid>
</div>

<style>
	#competitions {
		width: 70%;
	}

	.button-cell {
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--mdc-theme-on-secondary, #fff);
	}
</style>