<script>
    import Paper, { Title, Content } from '@smui/paper';
    import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text/index';
	import Button, { Label } from '@smui/button';
	
    let email = "";
	let password = "";

</script>

<div class="paper-container">
    <Paper color="white" class="paper-demo">
		<Title>Setup login</Title>
		<Content>

			<form action="/qdr" method="post">
				<Textfield bind:value={email} label="your email">
					<Icon class="material-icons" slot="leadingIcon">email</Icon>
					<HelperText slot="helper">Enter your email address which will be your login name</HelperText>
				</Textfield>
			
				<Textfield bind:value={password} label="password">
					<Icon class="material-icons" slot="leadingIcon">password</Icon>
					<HelperText slot="helper">Choose your password carefully - no validation or checks!</HelperText>
				</Textfield>
			
				<Button type="submit">go</Button>
			</form>
		  
		</Content>
	</Paper>
</div>
