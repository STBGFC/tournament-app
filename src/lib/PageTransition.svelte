<!-- PageTransition.svelte -->
<script>
    import { fade } from 'svelte/transition';

    export let refresh = '';
</script>
  
{#key refresh}
    <div out:fade="{{duration: 150}}" in:fade="{{duration: 200, delay: 155}}">
        <slot />
    </div>
{/key}
