<script>
    import Section from '$lib/Section.svelte';
    import Textfield from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text/index';
    import Button from '@smui/button';

    let email = '';
    let password = '';

    export const title = 'Registration';
</script>

<Section fab="icon:how_to_reg" container={true}>
    <div slot="section-head">
        <h4>QDR Form</h4>
    </div>

    <div slot="section-body">
        <form action="/qdr" method="post">
            <p>
                <Textfield style="width: 100%;" bind:value={email} label="your email">
                    <Icon class="material-icons" slot="leadingIcon">email</Icon>
                    <HelperText slot="helper">Enter your email address which will be your login name</HelperText>
                </Textfield>
            </p>
            <p>
                <Textfield style="width: 100%;" bind:value={password} label="password">
                    <Icon class="material-icons" slot="leadingIcon">password</Icon>
                    <HelperText slot="helper">Choose your password carefully - no validation or checks!</HelperText>
                </Textfield>
            </p>
            <p>
                <Button variant="raised" type="submit">submit</Button>
            </p>
        </form>
    </div>
</Section>
