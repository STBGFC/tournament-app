<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Paper, { Content } from '@smui/paper';
    import { tournament } from '$lib/db';
    import '../app.css';
</script>

<svelte:head>
	<title>{$tournament.name}</title>
</svelte:head>

<div class="flexy">
    <div class="top-app-bar-container flexor">
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

        <div class="paper-container">
            <Paper class="paper" elevation={14}>
                <Content>                
                    <slot/>
                </Content>
            </Paper>
        </div>
        
    </div>
</div>

<style>
    .top-app-bar-container {
        overflow: auto;
    }
    .paper-container {
        margin-top: 48px;
        padding: 36px 18px;
        min-width: 80%;
        flex-basis: 0;
        flex-grow: 1;
        overflow: auto;
    }
    .flexy {
        width: 100%;
        /* display: flex; */
        flex-wrap: wrap;
    }

    .flexor {
        flex-direction: column;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    * :global(.paper) {
        margin: 0 auto;
        max-width: 1024px;
        background-color: rgba(255,255,255,0.9);
    }
</style>