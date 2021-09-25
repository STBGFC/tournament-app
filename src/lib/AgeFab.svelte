<script>
	import Fab, { Label, Icon } from '@smui/fab';

    export let name = '';
    export let icon = '';
</script>

<Fab style="font-size: larger; font-weight: bold; margin-right: 20px;" color="primary">
    {#if name !== ''}
    <Label>{name}</Label>
    {:else}
    <Icon class="material-icons">{icon}</Icon>
    {/if}
</Fab>
