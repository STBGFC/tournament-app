<!-- PageTransition.svelte -->
<script>
    import { scale } from "svelte/transition";

    export let refresh = "";
</script>

{#key refresh}
    <div in:scale={{ duration: 450, delay: 0 }}>
        <slot />
    </div>
{/key}
