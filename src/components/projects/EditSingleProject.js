import React, { Component } from 'react';
import api from '../../modules/apiManager';
import { Box, Button, Form, Heading, Paragraph, TextArea, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

export default class EditSingleProject extends Component {
	state = {};
	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateProject = (evt) => {
		evt.preventDefault();

		const editedProjectInfo = {
			id: this.state.id,
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
			maxAge: this.state.maxAge
		};

		this.props
			.updateProject(editedProjectInfo)
			.then(() => this.props.history.replace(`/projects/${this.props.match.params.projectId}`));
	};
	componentDidMount() {
		api.single('projects', this.props.match.params.projectId).then((project) => {
			this.setState({
				id: this.props.match.params.projectId,
				name: project.name,
				shortDescription: project.shortDescription,
				street: project.street,
				city: project.city,
				State: project.State,
				zip: project.zip,
				specialInstructions: project.specialInstructions,
				restrictions: project.restrictions,
				experience: project.experience,
				maxVolunteers: project.maxVolunteers,
				minAge: project.minAge,
				maxAge: project.maxAge
			});
		});
	}
	render() {
		return (
			<Box direction="row">
				<Box direction="column">
					<Heading level={2}>Edit Project Information</Heading>
					<Form>
						<Paragraph>
							Name:
							<TextInput
								name="name"
								id="name"
								value={this.state.name}
								label="Name"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Short Description:
							<TextArea
								name="shortDescription"
								id="shortDescription"
								value={this.state.shortDescription}
								label="shortDescription"
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Location:
							<TextInput
								name="street"
								id="street"
								value={this.state.street}
								label="Street"
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="city"
								id="city"
								value={this.state.city}
								label="city"
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="State"
								id="State"
								label="state"
								value={this.state.State}
								onChange={this.handleFieldChange}
							/>
							<TextInput
								name="zip"
								id="zip"
								label="zip"
								value={this.state.zip}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Special Instructions:
							<TextArea
								name="specialInstructions"
								id="specialInstructions"
								label="Special Instructions"
								value={this.state.specialInstructions}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Restrictions:
							<TextArea
								name="restrictions"
								id="restrictions"
								label="Restrictions"
								value={this.state.restrictions}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Experience Required:
							<TextArea
								name="experience"
								id="experience"
								label="experience"
								value={this.state.experience}
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
								value={this.state.maxVolunteers}
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
								value={this.state.minAge}
								onChange={this.handleFieldChange}
							/>
							Maximum Volunteer Age
							<TextInput
								name="maxAge"
								id="maxAge"
								label="maxAge"
								type="number"
								value={this.state.maxAge}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>

						<Button type="submit" primary label="Submit" onClick={this.updateProject} />
					</Form>
				</Box>
				<Box>
					<Button
						icon={<Close />}
						onClick={() => this.props.history.push(`/projects/${this.props.match.params.projectId}`)}
					/>
				</Box>
			</Box>
		);
	}
}
