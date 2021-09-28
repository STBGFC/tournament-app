<script>
    import Fab, { Label, Icon } from "@smui/fab";

    export let name = "";
</script>

<Fab style="font-size: larger; font-weight: bold; margin-right: 20px;" color="primary">
    {#if name.startsWith("icon:")}
        <Icon class="material-icons">{name.split(":")[1]}</Icon>
    {:else}
        <Label>{name}</Label>
    {/if}
</Fab>
