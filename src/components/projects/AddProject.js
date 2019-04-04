import React, { Component } from 'react';
import { Box, Button, Form, TextInput, TextArea, Paragraph, Heading, Select } from 'grommet';
import { Close } from 'grommet-icons';
import api from '../../modules/apiManager';


const defaultOptions = [];
const objectOptions = [];
api.all('skills').then((skills) =>
	skills.map((skill) => {
		defaultOptions.push(skill.name);
		objectOptions.push({ lab: skill.name, val: skill.id });
		return null;
	})
);
export default class AddProject extends Component {
	state = {
		id: '',
		name: '',
		shortDescription: '',
		categoryId: '',
		street: '',
		city: '',
		State: '',
		zip: '',
		specialInstructions: '',
		restrictions: '',
		experience: '',
		maxVolunteers: '',
		minAge: '',
		maxAge: '',
		genderRestricted: '',
		options: objectOptions,
		value: ''
	};

	// Update state whenever an input field is edited
	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	constructNewProjectSkill = (projectId, skillId) => {
		const newProjectSkill = {
			projectId: projectId,
			skillId: skillId
		};
		api.post(newProjectSkill, 'projectsSkills');
	};

	constructNewProject = (evt) => {
		evt.preventDefault();
		const project = {
			name: this.state.name,
			shortDescription: this.state.shortDescription,
			street: this.state.street,
			city: this.state.city,
			State: this.state.State,
			zip: this.state.zip,
			specialInstructions: this.state.specialInstructions,
			restrictions: this.state.restrictions,
			experience: this.state.experience,
			maxVolunteers: this.state.maxVolunteers,
			minAge: this.state.minAge,
			maxAge: this.state.maxAge,
			date: new Date(),
			// Make sure the employeeId is saved to the database as a number since it is a foreign key.
			organizationId: parseInt(sessionStorage.getItem('userId'))
		};
		// Create the project and redirect user to project list
		this.props.addProject(project).then(() => {
			api.singleByAttribute('projects',"name", project.name).then((project) => {
				debugger
				this.state.value.map((skill) => this.constructNewProjectSkill(project[0].id, skill.val));
				this.props.history.push('/projects');
			});
		});
	};
	render() {
		const { options, value } = this.state;
		return (
			<Box direction="row">
				<Box direction="column">
					<Heading level={2}>Add Project Information</Heading>
					<Form>
						<Paragraph>
							Name:
							<TextInput name="name" id="name" label="Name" onChange={this.handleFieldChange} />
						</Paragraph>
						<Paragraph>
							Short Description:
							<TextArea
								name="shortDescription"
								id="shortDescription"
								label="shortDescription"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Location:
							<TextInput
								name="street"
								id="street"
								label="Stree"
								placeholder="street address"
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="city"
								id="city"
								label="city"
								placeholder="city"
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="State"
								id="State"
								label="state"
								placeholder="state"
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="zip"
								id="zip"
								label="zip"
								placeholder="zip code"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Special Instructions:
							<TextArea
								name="specialInstructions"
								id="specialInstructions"
								label="Special Instructions"
								placeholder="Enter any special instructions here, such as Don't use the water"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Restrictions:
							<TextArea
								name="restrictions"
								id="restrictions"
								label="Restrictions"
								placeholder="Enter and Restrictions for Volunteers, such as an't use Power Tools"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Experience Required:
							<TextArea
								name="experience"
								id="experience"
								label="experience"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Maximum Number of Volunteers Needed
							<TextInput
								name="maxVolunteers"
								id="maxVolunteers"
								label="Max Volunteers"
								type="number"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Minimum Volunteer Age
							<TextInput
								name="minAge"
								id="minAge"
								label="Min Age"
								type="number"
								onChange={this.handleFieldChange}
							/>
							Maximum Volunteer Age
							<TextInput
								name="maxAge"
								id="maxAge"
								label="maxAge"
								type="number"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Skills needed:
							<Box fill align="center" justify="start" pad="large">
								<Select
									size="medium"
									placeholder="Select Skills"
									multiple
									closeOnChange={false}
									disabledKey="dis"
									labelKey="lab"
									valueKey="val"
									value={value}
									options={options}
									onChange={({ value: nextValue }) => this.setState({ value: nextValue })}
									onClose={() => this.setState({ options: objectOptions })}
									onSearch={(text) => {
										const exp = new RegExp(text, 'i');
										this.setState({
											options: objectOptions.filter((o) => exp.test(o.lab))
										});
									}}
								/>
							</Box>
						</Paragraph>
						<Button type="submit" primary label="Submit" onClick={this.constructNewProject} />
					</Form>
				</Box>
				<Box>
					<Button
						icon={<Close />}
						onClick={() => {
							this.props.history.push('/projects');
						}}
					/>
				</Box>
			</Box>
		);
	}
}
