import React, { Component } from 'react';
import { Form, FormField, Button, Box, Heading, Text, TextInput, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';

export default class Register extends Component {
	state = {
		email: '',
		password: '',
		passwordConfirm: '',
		username: '',
		name: '',
		errorMessage: {}
	};
	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};
	handleRegister = (e) => {
		e.preventDefault();
		if (this.state.password !== this.state.passwordConfirm) {
			const errorMessage = "your passwords don't match";
			this.setState({ errorMessage: { passwordError: errorMessage } });
			return null;
		}
		const newUser = {
			email: this.state.email,
			password: this.state.password,
			username: this.state.username,
			name: this.state.name
		};
		this.props.getUser(newUser.username).then((user) => {
			if (user.length > 0) {
				const errorMessage = 'That username already exists';
				this.setState({ errorMessage: { usernameError: errorMessage } });
			} else {
				this.props.addUser(newUser).then(() => {
					debugger;
					this.props.getUser(newUser.username).then((user) => {
						sessionStorage.setItem('userId', user[0].id);
						this.props.history.push('/');
						this.props.refresh();
					});
				});
			}
		});
	};

	render() {
		return (
			<Box direction="row">
				<Box elevation="medium" pad="medium" margin="medium" border={{ color: 'accent', size: 'medium' }}>
					<Form>
						<Heading level={3} />
						<FormField label="Organization's Name" htmlFor="Name">
							<TextInput
								id="name"
								placeholder="Organization's Name"
								onChange={this.handleFieldChange}
								required
							/>
						</FormField>
						<FormField label="Username" htmlFor="username">
							<TextInput
								id="username"
								placeholder="Organization's Username"
								onChange={this.handleFieldChange}
								required
							/>
							<Text color="red" size="small">
								{this.state.errorMessage.usernameError}
							</Text>
						</FormField>
						<FormField label="Email Address" htmlFor="email">
							<TextInput
								id="email"
								placeholder="email address"
								onChange={this.handleFieldChange}
								required
								type="email"
							/>
						</FormField>
						<FormField label="Password" htmlFor="password">
							<TextInput
								id="password"
								type="password"
								placeholder="password"
								onChange={this.handleFieldChange}
								required
							/>
						</FormField>
						<FormField label="Confirm Password" htmlFor="passwordConfirm">
							<TextInput
								id="passwordConfirm"
								placeholder="confirm password"
								type="password"
								onChange={this.handleFieldChange}
								required
							/>
							<Text color="red" size="small">
								{this.state.errorMessage.passwordError}
							</Text>
						</FormField>
						<Paragraph />
						<Button
							type="button"
							onClick={() => {
								this.props.history.replace('/login');
							}}
							label="Sign In"
						/>
						<Button type="submit" onClick={this.handleRegister} label="Register" primary />
					</Form>
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
