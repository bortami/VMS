import React, { Component } from 'react';
import { Box, Heading, Text, Button, Paragraph, Form, FormField, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

export default class UserSettings extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
		username: '',
		errorMessage: ''
	};
	handlePasswordChange = (e) => {
		e.preventDefault();
	};
	handleUsernameChange = (e) => {
		e.preventDefault();
	};
	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};
	render() {
		return (
			<Box pad="medium" direction="row" overflow="scroll" fill justify="center">
				<Box
					elevation="medium"
					pad="medium"
					margin="medium"
					direction="column"
					width="50vw"
					height="fit"
					gap="medium"
				>
					<Heading level={3}>Settings</Heading>
					<Text size="medium">Edit your Settings</Text>

					<Heading level={5}>Change your password</Heading>
					<Form onSubmit={this.handlePasswordChange}>
						<FormField label="Old Password" htmlFor="oldPassword">
							<TextInput required id="oldPassword" name="oldPassword" onChange={this.handleFieldChange} />
						</FormField>
						<FormField label="New Password" htmlFor="newPassword">
							<TextInput required id="newPassword" name="newPassword" onChange={this.handleFieldChange} />
						</FormField>
						<FormField label="Confirm New Password" htmlFor="confirmNewPassword">
							<TextInput
								required
								id="confirmNewPassword"
								name="confirmNewPassword"
								onChange={this.handleFieldChange}
							/>
						</FormField>
						<Button type="submit" label="Update Password" primary />
					</Form>

					<Heading level={4}>Change your username</Heading>
					<Form onSubmit={this.handleUsernameChange}>
						<FormField label="New Username" htmlFor="username">
							<TextInput required id="username" name="username" onChange={this.handleFieldChange} />
						</FormField>
						<Button type="submit" label="Update Username" />
					</Form>

					<Heading level={4}>Change your Organization's Name</Heading>
					<Form onSubmit={this.handleNameChange}>
						<FormField label="name" htmlFor="name">
							<TextInput required id="name" name="name" onChange={this.handleFieldChange} />
						</FormField>
						<Button type="submit" label="Update Organization's Name" />
					</Form>
				</Box>

				<Box>
					<Button
						icon={<Close />}
						plain
						onClick={() => {
							this.props.history.push('/');
						}}
					/>
				</Box>
			</Box>
		);
	}
}
