<script>
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
</script>

<svelte:head>
</svelte:head>

<div class="paper-container">
    
    <Content>
        <Paper elevation={24}>
            <slot/>
        </Paper>
    </Content>


</div>
    

<style>
    .paper-container {
      padding: 36px 18px;
      /* background-color: var(--mdc-theme-background, #f8f8f8); */
      border: 1px solid
        var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.8));
    }
   
    * :global(.paper-demo) {
      margin: 0 auto;
      max-width: 600px;
    }
</style>