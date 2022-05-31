<script context="module">
    export function load({ error, status }) {
        return {
            props: { error, status },
        };
    }
</script>

<script>
    import Section from "$lib/Section.svelte";

    export let status;
    export let error;
</script>

<Section fab="icon:error" container={true}>
    <div slot="section-head">
        <h4>Error ({status})</h4>
        {error.message}
    </div>

    <div slot="section-body">
        {#if status == 500}
            There was a problem on the server, it might be temporary.
        {:else if status == 404}
            Not found.. please check any links you clicked, they may be out of date.
        {:else}
            Not sure what else to tell you :(
        {/if}
    </div>
</Section>
