<script>
    import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text/index';
	import Button, { Label } from '@smui/button';
	
    let email = "";
	let password = "";
	
	export const title = "Registration"

</script>

<form action="/qdr" method="post">
	<Textfield bind:value={email} label="your email">
		<Icon class="material-icons" slot="leadingIcon">email</Icon>
		<HelperText slot="helper">Enter your email address which will be your login name</HelperText>
	</Textfield>

	<Textfield bind:value={password} label="password">
		<Icon class="material-icons" slot="leadingIcon">password</Icon>
		<HelperText slot="helper">Choose your password carefully - no validation or checks!</HelperText>
	</Textfield>

	<Button variant="raised" type="submit">submit</Button>
</form>
