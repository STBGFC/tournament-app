<!-- PageTransition.svelte -->
<script>
    import { fly } from "svelte/transition";
    
    export let refresh = "";
</script>
  
{#key refresh}
    <div out:fly={{ x: -200, duration: 350 }} in:fly={{ x: 200, duration: 750, delay: 0 }}>
        <slot />
    </div>
{/key}
