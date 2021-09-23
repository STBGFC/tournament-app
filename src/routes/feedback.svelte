<script>
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import HelperText from '@smui/textfield/helper-text/index';
  import CharacterCounter from '@smui/textfield/character-counter/index';

  let email = '';
  let feedback = '';
</script>

<div class="section-head">
    <div class="content">
	    <h4>Feedback Form</h4>
    </div>
</div>

<div class="section-body raw-content">
    <p>
        <Textfield style="width: 100%;" helperLine$style="width: 100%;" bind:value={email} label="Your email">
            <Icon class="material-icons" slot="leadingIcon">mail</Icon>
            <HelperText slot="helper">The email address we can contact you back on</HelperText>
        </Textfield>
    </p>

    <p>
        <Textfield 
            textarea 
            style="width: 100%;height: 200px;" 
            helperLine$style="width: 100%;" 
            label="Feedback"
            bind:value={feedback} 
            input$maxlength={500}>
            <HelperText slot="helper"></HelperText>
            <CharacterCounter slot="internalCounter">0 / 500</CharacterCounter>
        </Textfield>
    </p>
</div>
