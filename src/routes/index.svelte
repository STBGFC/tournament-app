<script>
    import Button, { Label } from '@smui/button';
	let tournament = { name: 'Sandhurst 2021', description: 'foo bar', competitions: [] };
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<blockquote>
	<h1>{tournament.name}</h1>
	<p>{tournament.description}</p>
	<footer>Select a competition below to view results and fixtures</footer>
</blockquote>

<div id="competitions">
	{#each tournament.competitions as comp}
		<Button variant="raised">
			<Label>hello</Label>
		</Button>
	{/each}
</div>
