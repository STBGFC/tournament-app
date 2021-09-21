<!-- PageTransition.svelte -->
<script>
    import { fly } from 'svelte/transition';
    
    export let refresh = '';
</script>
  
{#key refresh}
    <div out:fly={{ x: -85, duration: 200 }} in:fly={{ x: 505, duration: 200, delay: 50 }}>
        <slot />
    </div>
{/key}
