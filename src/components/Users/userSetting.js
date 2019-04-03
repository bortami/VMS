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

	render() {
		return (
			<Box pad="medium" direction="row">
				<Box elevation="medium" pad="medium" margin="medium" direction="column">
					<Box>
						<Heading level={3}>Settings</Heading>
						<Text size="medium">Edit your Settings</Text>
					</Box>
					<Box>
						<Heading level={5}>Change your password</Heading>
						<Form onSubmit={this.handlePasswordChange}>
							<FormField label="Old Password" htmlFor="oldPassword">
								<TextInput required id="oldPassword" name="oldPassword" onChange={() => {}} />
							</FormField>
							<FormField label="New Password" htmlFor="newPassword">
								<TextInput required id="newPassword" name="newPassword" onChange={() => {}} />
							</FormField>
							<FormField label="Confirm New Password" htmlFor="confirmNewPassword">
								<TextInput
									required
									id="confirmNewPassword"
									name="confirmNewPassword"
									onChange={() => {}}
								/>
							</FormField>
							<Button type="submit" label="Submit" primary />
						</Form>
					</Box>
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
