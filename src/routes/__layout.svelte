<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';

    let tournament = {
        title: "Sandhurst 2021"
    };
</script>

<svelte:head>
</svelte:head>

<div class="flexy">
    <div class="top-app-bar-container">
        <TopAppBar variant="static" dense>
            <Row>
                <Section>
                    <IconButton class="material-icons">menu</IconButton>
                    <Title>{tournament.title}</Title>
                </Section>
                <Section align="end" toolbar>
                    <IconButton class="material-icons" aria-label="Home">home</IconButton>
                    <!-- <IconButton class="material-icons" aria-label="Print this page">print</IconButton> -->
                    <IconButton class="material-icons" aria-label="Bookmark this page">login</IconButton>
                </Section>
            </Row>
        </TopAppBar>
    </div>
    
    <slot/>

</div>

