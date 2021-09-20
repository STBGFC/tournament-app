<!-- PageTransition.svelte -->
<script>
    import { fly } from 'svelte/transition';
    
    export let refresh = '';
</script>
  
{#key refresh}
    <div out:fly={{ x: -85, duration: 200 }} in:fly={{ x: 85, duration: 280, delay: 250 }}>
        <slot />
    </div>
{/key}
