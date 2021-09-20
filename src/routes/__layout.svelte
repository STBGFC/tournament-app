<script>
    import { tournament } from '$lib/db';
    import '$lib/app.scss';
    import MenuDrawer from '$lib/MenuDrawer.svelte';
    import PageTransition from '$lib/PageTransition.svelte';

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    let drawerOpen = false;
    export let routeKey;
</script>

<script context="module">
    export const load = async ({ page }) => ({
        props: {
            routeKey: page.path,
        },
    })
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
    
    <PageTransition refresh={routeKey}>
        <section id="slot">
            <slot/>
        </section>
    </PageTransition>
        
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
        overflow: hidden;
    }

    #slot {
        padding-top: 38px;
        margin: 10px auto;
        max-width: 1200px;
        width: 100%;
        min-height: 81vh;
    }
    
    #footer {
        padding: 2.9em 0;
        margin: 0;
        text-align: center;
        color: var(--mdc-theme-on-primary);
        font-size: smaller;
    }
    
    #footer a {
        color: #f5f5f5;
        border-bottom: 1px dotted #f5f5f5;
        text-decoration: none;
    }
</style>