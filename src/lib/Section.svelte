<script>
    import AgeFab from "$lib/AgeFab.svelte";

    export let fab = "";
    export let container = false;
</script>

<div class="section-head">
    {#if fab !== ""}
        <AgeFab name={fab} />
        <div class="content">
            <slot name="section-head" />
        </div>
    {:else}
        <slot name="section-head" />
    {/if}
</div>

<div class="section-body" class:raw-content={container}>
    <slot name="section-body" />
</div>

<style>
    * :global(.mdc-fab) {
        float: left;
    }

    .section-head {
        padding: 40px 15px;
        color: var(--mdc-theme-on-primary, whitesmoke);
        background-color: #333;
        background-color: var(--mdc-theme-text-icon-on-light);
    }

    .section-head .content {
        margin-left: 90px;
    }

    * :global(.section-head .content a) {
        color: inherit;
        border-bottom: 1px dotted var(--mdc-theme-on-primary, whitesmoke);
        text-decoration: none;
        text-transform: uppercase;
    }

    .section-body {
        color: var(--mdc-theme-on-surface, #333);
        background-color: var(--mdc-theme-surface, white);
        border-radius: 0 0 6px 6px;
    }

    div.raw-content {
        padding: 10px;
    }
</style>
