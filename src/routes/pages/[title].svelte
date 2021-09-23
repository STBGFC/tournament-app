<script>
    import AgeFab from '$lib/AgeFab.svelte';
    import { pages } from '$lib/db';
    import { page } from "$app/stores";

    import marked from 'marked';

    const { title } = $page.params;
    let body = '';

    $pages.forEach( p => { if ( p.title === title ) body = p.body });

</script>

<div class="section-head">
    <AgeFab name="info"/>
    <div class="content">
	    <h4>{title}</h4>
    </div>
</div>

<div class="section-body raw-content">
    {@html marked(body)}
</div>

<style>
    * :global(.mdc-fab) {
        float: left;
    }
</style>
