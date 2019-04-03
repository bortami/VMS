import React, { Component } from 'react';
import { Form, TextInput, FormField, Heading, Box, CheckBox, Button, Text, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';

export default class Login extends Component {
	state = {
		username: '',
		password: '',
		errorMessage: ''
	};
	constructor(props) {
		super(props);
		this.state = { checked: !!props.checked };
	}
	onChange = (event) => this.setState({ checked: event.target.checked });

	handleFieldChange = (evt) => {
		const stateToChange = {};
		if (evt.target.type === 'checkbox') {
			stateToChange[evt.target.id] = evt.target.checked;
		} else {
			stateToChange[evt.target.id] = evt.target.value;
		}

		this.setState(stateToChange);
	};

	handleLogin = (e) => {
		e.preventDefault();

		this.props.getUser(this.state.username).then((user) => {
			let errorMessage = '';
			if (user.length === 0) {
				errorMessage = "We couldn't find your account";
				this.setState({ errorMessage: errorMessage });
			} else {
				if (this.state.password === user[0].password) {
					this.state.checked
						? localStorage.setItem('userId', user[0].id)
						: sessionStorage.setItem('userId', user[0].id);
					this.props.history.push('/');
				} else {
					window.alert('You have entered incorrect credentials.');
				}
			}
		});
	};

	render() {
		const { checked } = this.state;
		return (
			<Box direction="row">
				<Box elevation="medium" pad="medium" margin="medium" border={{ color: 'accent', size: 'medium' }}>
					<Form onSubmit={this.handleLogin}>
						<Heading level={3}>Please sign in</Heading>
						<FormField label="Username" htmlFor="username">
							<TextInput
								id="username"
								placeholder="Organization's Username"
								onChange={this.handleFieldChange}
								required
							/>
						</FormField>
						<FormField label="Password" htmlFor="password">
							<TextInput
								id="password"
								placeholder="password"
								onChange={this.handleFieldChange}
								required
							/>
						</FormField>
						<CheckBox
							{...this.props}
							checked={checked}
							onChange={this.onChange}
							label="Remember Me"
							id="rmemberMe"
						/>
						<Paragraph />
						<Button
							type="button"
							onClick={() => this.props.history.replace('/register')}
							label="Register"
						/>
						<Button type="submit" label="Sign In" primary />
					</Form>
					<Text color="accent">{this.state.error}</Text>
				</Box>
				<Box>
					<Button
						icon={<Close />}
						onClick={() => {
							this.props.history.push('/');
						}}
					/>
				</Box>
			</Box>
		);
	}
}
