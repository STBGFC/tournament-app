<script>
    import { tournament } from '$lib/db';
    import '$lib/app.scss';
    import MenuDrawer from '$lib/MenuDrawer.svelte';

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    let drawerOpen = false;
</script>

<svelte:head>
	<title>{$tournament.name}</title>
</svelte:head>

<MenuDrawer bind:open={drawerOpen} tournament={$tournament}/>

<div class="flex-layout">
    <main>
        <TopAppBar variant="standard" dense>
            <Row>
                <Section>
                    <IconButton class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}>menu</IconButton>
                    <Title>{$tournament.name}</Title>
                </Section>
                <Section align="end" toolbar>
                    <a href="/"><IconButton class="material-icons" aria-label="Home">home</IconButton></a>
                    <!-- <IconButton class="material-icons" aria-label="Print this page">print</IconButton> -->
                    <IconButton class="material-icons" aria-label="Bookmark this page">login</IconButton>
                </Section>
            </Row>
        </TopAppBar>
    </main>

    <section id="slot">
        <slot/>
    </section>

    <section id="footer">
        <p>&copy; Darren Davison &amp; <a href="{ $tournament.siteUrl }">{ $tournament.club }</a> 2021</p>
    </section>

</div>

<style>
    .flex-layout {
        flex-direction: column;
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        color: var(--mdc-theme-on-primary);
    }

    #slot {
        padding-top: 38px;
        margin: 10px auto;
        max-width: 1200px;
        width: 100%;
    }
    
    #footer {
        padding: 0.5em 0;
        margin: 0;
        text-align: center;
        color: var(--mdc-theme-on-primary);
        font-size: smaller;
        background-color: var(--mdc-theme-text-icon-on-light);
    }
    
    #footer a {
        color: #f5f5f5;
        border-bottom: 1px dotted #f5f5f5;
        text-decoration: none;
    }
</style>