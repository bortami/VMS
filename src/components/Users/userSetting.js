import React, { Component } from 'react';
import { Box, Heading, Text, Button, Paragraph, Form, FormField, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import api from '../../modules/apiManager';

export default class UserSettings extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
		username: '',
		errorMessage: '',
		skills: []
	};
	handlePasswordChange = (e) => {
		e.preventDefault();
	};
	handleUsernameChange = (e) => {
		e.preventDefault();
		const newUsername = {
			username: this.state.username
		};
		return null;
	};
	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};
	componentDidMount() {
		const newState = {};
		api.all('skills').then((skills) => {
			newState.skills = skills;
			api.single('organizations', sessionStorage.getItem('userId')).then((user) => {
				newState.oldPassword = user.password;
				this.setState(newState);
			});
		});
	}

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

					<Heading level={4}>Change your password</Heading>
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

					<Heading level={4}>Edit your Organization's Skills</Heading>
					<Form onSubmit={this.handleFieldChange}>
						<FormField label="New Skill" htmlFor="skills">
							<TextInput id="skills" name="skills" onChage={this.handleFieldChange} />
						</FormField>
						<Button type="submit" label="Add Skill" />
					</Form>
					<Box>
						{this.state.skills.map((skill) => (
							<Button onClick={this.doathingwithaSkll} type="button" label={skill.name} />
						))}
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
