import React, { Component } from 'react';
import api from '../../modules/apiManager';
import { Box, Button, Form, Heading, Paragraph, Select, TextArea, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

export default class SingleVolunteerEditForm extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		image: '',
		gender: '',
		location: '',
		notes: '',
		options: [ 'Male', 'Female', 'Other' ],
		value: ''
	};
	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};
	updateVolunteer = (evt) => {
		evt.preventDefault();

		const editedVolunteerInfo = {
			id: this.props.match.params.volunteerId,
			name: this.state.name,
			email: this.state.email,
			phone: this.state.phone,
			image: this.state.image,
			gender: this.state.gender,
			location: this.state.location,
			notes: this.state.notes
		};

		this.props.updateVolunteer(editedVolunteerInfo).then(() => this.props.history.goBack());
	};
	componentDidMount() {
		api.single(this.props.route, this.props.match.params.volunteerId).then((volunteer) => {
			this.setState({
				name: volunteer.name,
				email: volunteer.email,
				phone: volunteer.phone,
				image: volunteer.image,
				gender: volunteer.gender,
				location: volunteer.location,
				notes: volunteer.notes,
				value: volunteer.gender
			});
		});
	}
	render() {
		const { options, value } = this.state;
		return (
			<Box direction="row">
				<Box direction="column">
					<Heading level={2}>Edit Volunteer Information</Heading>
					<Form>
						<Paragraph>
							Name:
							<TextInput
								name="name"
								id="name"
								label="Name"
								value={this.state.name}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Email:
							<TextInput
								name="email"
								id="email"
								label="Email"
								type="email"
								value={this.state.email}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Phone Number:
							<TextInput
								name="phone"
								id="phone"
								label="Phone Number"
								type="tel"
								value={this.state.phone}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Link to Image:
							<TextInput
								name="image"
								id="image"
								label="Image Link"
								type="url"
								value={this.state.image}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Gender:
							<Select
								id="gender"
								name="gender"
								placeholder="Select Gender"
								value={value}
								options={options}
								onChange={({ option }) => this.setState({ gender: option, value: option })}
							/>
						</Paragraph>
						<Paragraph>
							Location:
							<TextInput
								name="location"
								id="location"
								label="Location"
								value={this.state.location}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Paragraph>
							Additional Notes:
							<TextArea
								name="notes"
								id="notes"
								label="Notes"
								value={this.state.notes}
								onChange={this.handleFieldChange}
							/>
						</Paragraph>
						<Button type="submit" primary label="Submit" onClick={this.updateVolunteer} />
					</Form>
				</Box>
				<Box>
					<Button icon={<Close />} onClick={() => this.props.history.goBack()} />
				</Box>
			</Box>
		);
	}
}
