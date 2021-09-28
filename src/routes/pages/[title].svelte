<script>
    import Section from '$lib/Section.svelte';
    import { pages } from '$lib/db';
    import { page } from '$app/stores';

    import marked from 'marked';

    const { title } = $page.params;
    let body = '';

    $pages.forEach((p) => {
        if (p.title === title) body = p.body;
    });
</script>

<Section fab="icon:info" container={true}>
    <div slot="section-head">
        <h4>{title}</h4>
    </div>

    <div slot="section-body">
        {@html marked(body)}
    </div>
</Section>
