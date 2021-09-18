<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Paper, { Content } from '@smui/paper';
    import { tournament } from '$lib/db';
    import '$lib/app.scss';
</script>

<svelte:head>
	<title>{$tournament.name}</title>
</svelte:head>

<div class="flex-layout">
    <main>
        <TopAppBar variant="standard" dense>
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
    </main>
    <div class="paper-container">
        <Paper class="paper" elevation={4}>
            <Content>                
                <slot/>
            </Content>
        </Paper>
    </div>

    <p class="footer">&copy; Darren Davison &amp; <a href="{ $tournament.siteUrl }">{ $tournament.club }</a> 2021</p>
</div>

<style>
    .paper-container {
        margin-top: 44px;
        padding: 26px 10px;
        min-width: 80%;
        flex-basis: 0;
        flex-grow: 1;
        overflow: none;
    }

    .flex-layout {
        flex-direction: column;
        min-height: 100vh;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
    }

    * :global(.paper) {
        margin: 0 auto;
        max-width: 1024px;
        background-color: rgba(255,255,255,0.97);
    }

    .footer {
        padding: 1.2rem 0;
        margin: 0;
        text-align: center;
        color: white;
        font-size: smaller;
        background-color: rgba(48,48,48,.35);
    }
    
    .footer a {
        color: #f5f5f5;
        border-bottom: 1px dotted #f5f5f5;
        text-decoration: none;
    }
</style>