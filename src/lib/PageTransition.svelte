<!-- PageTransition.svelte -->
<script>
    import { fly } from "svelte/transition"
    export let refresh = ""
</script>
  
{#key refresh}
    <div out:fly={{ x: -200, duration: 250 }} in:fly={{ x: 200, duration: 250, delay: 75 }}>
        <slot />
    </div>
{/key}
