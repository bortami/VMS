import React, { Component } from 'react';
import { Box, Heading, Text, Button, Paragraph, Form, FormField, TextInput } from 'grommet';
import { Close, Trash } from 'grommet-icons';
import api from '../../modules/apiManager';

export default class UserSettings extends Component {
	state = {
		oldPassword: '',
		oldPasswordCheck: '',
		newPassword: '',
		confirmNewPassword: '',
		username: '',
		errorMessage: '',
		skills: [],
		newSkill: '',
		successMessage: ''
	};
	handlePasswordChange = (e) => {
		e.preventDefault();
		if (this.state.oldPassword !== this.state.oldPasswordCheck) {
			const errorMessage = 'Your old password is incorrect';
			this.setState({ errorMessage: { passwordError: errorMessage } });
			return null;
		} else if (this.state.newPassword !== this.state.confirmNewPassword) {
			const errorMessage = 'Your new passwords do not match.';
			this.setState({ errorMessage: { passwordError: errorMessage } });
			return null;
		} else if (this.state.newPassword === this.state.oldPassword) {
			const errorMessage = 'Your old and new password cannot be the same.';
			this.setState({ errorMessage: { passwordError: errorMessage } });
			return null;
		}
		const newPassword = {
			id: sessionStorage.getItem('userId'),
			password: this.state.newPassword
		};
		api.put('organizations', newPassword).then(
			() => document.querySelector('#password-form').reset(),
			this.setState({
				successMessage: { passwordSuccess: 'Password has been changed' },
				errorMessage: { passwordError: '' }
			})
		);
	};
	handleUsernameChange = (e) => {
		e.preventDefault();
		const newUsername = {
			id: sessionStorage.getItem('userId'),
			username: this.state.username
		};
		api
			.put('organizations', newUsername)
			.then(
				() => document.querySelector('#username-form').reset(),
				this.setState({ successMessage: { usernameSuccess: 'Username has been changed' } })
			);
	};
	addNewSkill = (e) => {
		e.preventDefault();
		this.state.skills.map((skill) => {
			if (skill.name === this.state.newSkill) {
				this.setState({ errorMessage: { skillError: 'Skill already exists' } });
				return null;
			}
			return null;
		});
		const newSkill = {
			name: this.state.newSkill
		};
		api.post(newSkill, 'skills').then(() => {
			api.all('skills').then((skills) => {
				this.setState({ skills: skills });
				document.querySelector('#skills-form').reset();
				return null;
			});
		});
	};

	doathingwithaSkll = (id) => {
		const newState = {};
		api.deleteAndList('skills', id).then((skills) => {
			newState.skills = skills;
			this.setState(newState);
		});
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
					<Form onSubmit={this.handlePasswordChange} id="password-form">
						<FormField label="Old Password" htmlFor="oldPasswordCheck">
							<TextInput
								required
								id="oldPasswordCheck"
								name="oldPasswordCheck"
								onChange={this.handleFieldChange}
							/>
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
						<Paragraph color="green">{this.state.successMessage.passwordSuccess}</Paragraph>
						<Paragraph color="red">{this.state.errorMessage.passwordError}</Paragraph>
					</Form>

					<Heading level={4}>Change your username</Heading>
					<Form onSubmit={this.handleUsernameChange} id="username-form">
						<FormField label="New Username" htmlFor="username">
							<TextInput required id="username" name="username" onChange={this.handleFieldChange} />
						</FormField>
						<Button type="submit" label="Update Username" />
						<Paragraph color="green">{this.state.successMessage.usernameSuccess}</Paragraph>
					</Form>

					<Heading level={4}>Edit your Organization's Skills</Heading>
					<Form onSubmit={this.addNewSkill} id="skills-form">
						<FormField label="New Skill" htmlFor="newSkill">
							<TextInput id="newSkill" name="newSkill" onChange={this.handleFieldChange} />
						</FormField>
						<Button type="submit" label="Add Skill" />
						<Paragraph color="red">{this.state.errorMessage.skillError}</Paragraph>
					</Form>
					<Box>
						<Text size="xsmall" color="red">
							Deleting skills cannot be undone and can have unintended consequences!
						</Text>
						<div>
							{this.state.skills.map((skill) => (
								<Button
									onClick={() => this.doathingwithaSkll(skill.id)}
									type="button"
									label={skill.name}
									icon={<Trash />}
								/>
							))}
						</div>
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
