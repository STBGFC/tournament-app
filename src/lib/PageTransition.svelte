<!-- PageTransition.svelte -->
<script>
    import { blur } from 'svelte/transition';

    export let refresh = '';
</script>
  
{#key refresh}
    <div transition:blur="{{amount: 30}}">
        <slot />
    </div>
{/key}
