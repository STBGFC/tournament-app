<script>
    import Result from '$lib/Result.svelte';

    export let results = [];

</script>

{#if results.length > 0}
<table class="table tp">
    <thead>
        <tr>
            <th class="text-center" width="10px"><small><span class="material-icons">sell</span></small></th>
            <th class="text-center" width="10px"><small><span class="material-icons">schedule</span></small></th>
            <th class="text-center" width="10px"><small><span class="material-icons">place</span></small></th>
            <th class="text-right">home</th>
            <th colspan="2"></th>
            <th class="text-left">away</th>
        </tr>
    </thead>
    <tbody>
        <!-- TODO: results needs to be ordered by pitchNumber, then dateTime -->
        {#each results as result}
        <Result bind:result/>
        {/each}
    </tbody>
</table>
{/if}

<style>

</style>
