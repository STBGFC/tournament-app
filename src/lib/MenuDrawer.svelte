<script>
    import { goto } from '$app/navigation';

    import Drawer, {
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from '@smui/drawer';
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';

    export let open = false;
    export let tournament;
    let active = 'Inbox';

    function setActive(value, location) {
        active = value;        
        open = false;
        if (location) goto(location);
    }
</script>

<Drawer variant="modal" fixed={false} bind:open>
    <Header>
        <Title><img style="float: left; width: 50px; padding: 9px 9px 0 0" src="/images/badge-icon.png" alt="{tournament.club}">{tournament.name}</Title>
        <Subtitle>{tournament.club}</Subtitle>
    </Header>
    <Content>
        <List>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive('Home', '/')}
                activated={active === 'Home'}
            >
                <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                <Text>Home</Text>
            </Item>
            <Item
                href="https://www.google.com/maps/d/u/1/viewer?mid=1-tGr4K7TJqRdHiwVzt_1Mx3N2uWX0LOQ&amp;ll=51.344332631008605%2C-0.7904230626670583&z=19"
            >
                <Graphic class="material-icons" aria-hidden="true">fmd_good</Graphic>
                <Text>Site Map</Text>
            </Item>
            <Item
                href="javascript:void(0)"
                on:click={() => setActive('Feedback', '/feedback')}
                activated={active === 'Feedback'}
            >
                <Graphic class="material-icons" aria-hidden="true">send</Graphic>
                <Text>Feedback</Text>
            </Item>

            <Separator />
            <Subheader>Tournament Information</Subheader>
            {#each tournament.pages as page}
            <Item
                href="javascript:void(0)"
                on:click={() => setActive(page.title, `/pages/${page.title}`)}
                activated={active === page.title}
            >
                <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
                <Text>{page.title}</Text>
            </Item>
            {/each}
        </List>
    </Content>
</Drawer>
<Scrim fixed={false} />
