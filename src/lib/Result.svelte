<script>
    import moment from 'moment-timezone';
    
    let time = function(dateTime) {
      return moment(dateTime).tz('Europe/London').format('hh:mm')
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

    export let result = {}

</script>

<tr>
    <td class="text-center text-muted info-col">{result.tag}</td>
    <td class="text-center text-muted info-col">{time(result.dateTime)}</td>
    <td class="text-center text-muted info-col">{result.pitch}</td>
    <!--  :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)" -->
    <td on:click={() => result.homeGoals += 1} class="text-right">{result.homeTeam}</td>
    <td class="text-center points">{homeScore(result)}</td>
    <td class="text-center points">{awayScore(result)}</td>
    <!--  :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)" -->
    <td on:click={() => result.awayGoals += 1} class="text-left">{result.awayTeam}</td>
</tr>

<style>

</style>
