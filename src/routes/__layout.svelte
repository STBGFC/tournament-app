<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import { tournament } from '$lib/db';
</script>

<svelte:head>
	<title>{$tournament.name}</title>
</svelte:head>

<div class="flexy">
    <div class="top-app-bar-container">
        <TopAppBar variant="static" dense>
            <Row>
                <Section>
                    <IconButton class="material-icons">menu</IconButton>
                    <Title>{$tournament.name}</Title>
                </Section>
                <Section align="end" toolbar>
                    <a href="/"><IconButton class="material-icons" aria-label="Home">home</IconButton></a>
                    <!-- <IconButton class="material-icons" aria-label="Print this page">print</IconButton> -->
                    <IconButton class="material-icons" aria-label="Bookmark this page">login</IconButton>
                </Section>
            </Row>
        </TopAppBar>
    </div>
    
    <slot/>

</div>
