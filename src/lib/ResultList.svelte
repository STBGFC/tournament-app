<script>
    import moment from 'moment-timezone';
    import { highlight } from '$lib/db';
    
    let time = function(dateTime) {
      return moment(dateTime).tz('Europe/London').format('HH:mm')
    }

    let homeScore = function(r) {
      if ('homeGoals' in r && r.homeGoals >= 0) {
        return r.homeGoals + (r.awayPens || r.homePens ? '(' + r.homePens + ')' : '');
      } else {
        return '';
      }
    }

    let awayScore = function(r) {
      if ('awayGoals' in r && r.awayGoals >= 0) {
        return (r.awayPens || r.homePens ? '(' + r.awayPens + ')' : '') + r.awayGoals;
      } else {
        return '';
      }
    }

    export let results = [];

</script>

{#if results.length > 0}
<table class="table tp">
    <thead>
        <tr>
            <th class="text-center"></th>
            <th class="text-right">home</th>
            <th colspan="2"></th>
            <th class="text-left">away</th>
        </tr>
    </thead>
    <tbody>
        <!-- TODO: results needs to be ordered by pitchNumber, then dateTime -->
        {#each results as result}
        <tr>
            <td class="text-center text-muted info-col" style="width:20px">{result.tag}</td>
            <td on:click={() => {result.homeGoals += 1; $highlight = result.homeTeam}} class="text-right {$highlight == result.homeTeam ? 'team-highlight' : ''}">{result.homeTeam}</td>
            
            {#if homeScore(result) == ''}
            <td colspan="2" class="text-center text-muted" style="width:40px">{time(result.dateTime)}<br/>pitch&nbsp;{result.pitch}</td>
            {:else}
            <td class="text-right points" style="width:15px">{homeScore(result)}</td>
            <td class="text-left points" style="width:15px">{awayScore(result)}</td>
            {/if}
            
            <td on:click={() => {result.awayGoals += 1; $highlight = result.awayTeam}} class="text-left {$highlight == result.awayTeam ? 'team-highlight' : ''}">{result.awayTeam}</td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

<style>

</style>
