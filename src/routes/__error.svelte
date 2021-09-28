<script context="module">
    export function load({ error, status }) {
        return {
            props: { error, status },
        };
    }
</script>

<script>
    export let status;
    export let error;
</script>

<!-- TODO figure out what to do with stacktraces in prod -->

<div class="section-head">
    <div class="content">
        <h4>Oops.. an error ({status}) occurred</h4>
    </div>
</div>

<div class="section-body">
    {#if error.stack}
        <pre>{error.stack}</pre>
    {:else}
        Not sure what else to tell you :(
    {/if}
</div>
