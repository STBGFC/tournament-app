<script context="module">
    export const prerender = true;
</script>

<script>
    import Section from "$lib/Section.svelte";
    import Textfield from "@smui/textfield";
    import Icon from "@smui/textfield/icon";
    import HelperText from "@smui/textfield/helper-text";
    import CharacterCounter from "@smui/textfield/character-counter";
    import Button from "@smui/button";

    let email = "";
    let feedback = "";
</script>

<Section fab="icon:send" container={true}>
    <div slot="section-head">
        <h4>Feedback Form</h4>
    </div>

    <div slot="section-body">
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
                input$maxlength={500}
            >
                <HelperText slot="helper" />
                <CharacterCounter slot="internalCounter">0 / 500</CharacterCounter>
            </Textfield>
        </p>
        <p>
            <Button variant="raised" type="submit">submit</Button>
        </p>
    </div>
</Section>
