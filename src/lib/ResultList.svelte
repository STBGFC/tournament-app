<script>
    import moment from 'moment-timezone';
    
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
            <td class="text-center text-muted info-col" style="width:15px">{result.tag}</td>
            <!--  :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)" -->
            <td on:click={() => result.homeGoals += 1} class="text-right">{result.homeTeam}</td>
            {#if homeScore(result) == ''}
            <td colspan="2" class="text-center text-muted" style="width:30px">{time(result.dateTime)}<br/>pitch {result.pitch}</td>
            {:else}
            <td class="text-center points" style="width:15px">{homeScore(result)}</td>
            <td class="text-center points" style="width:15px">{awayScore(result)}</td>
            {/if}
            <!--  :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)" -->
            <td on:click={() => result.awayGoals += 1} class="text-left">{result.awayTeam}</td>
        </tr>
        {/each}
    </tbody>
</table>
{/if}

<style>

</style>
