import React, { Component } from 'react';
import api from '../../modules/apiManager';
import Moment from 'react-moment';
import {
	Box,
	Image,
	Heading,
	Anchor,
	Layer,
	Button,
	Select,
	Form,
	Text,
	Table,
	TableRow,
	TableCell,
	TableHeader,
	TableBody,
	Paragraph
} from 'grommet';
import { MailOption, AddCircle, Trash, Close, Checkmark, Edit, Add } from 'grommet-icons';

export default class SingleProjectView extends Component {
	state = {
		openDelete: undefined,
		openVolunteerList: undefined,
		value: '',
		options: [],
		volunteers: [],
		skills: []
	};

	onOpenDelete = () => this.setState({ openDelete: true });
	onOpenVolunteerList = () => this.setState({ openVolunteerList: true });

	onCloseDelete = () => this.setState({ openDelete: undefined });
	onCloseVolunteerList = () => this.setState({ openVolunteerList: undefined });

	totalHours = (projectId) => {
		const total = this.props.hours
			.filter((hours) => hours.projectId === projectId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return total;
	};
	skillList = (projectId) => {
		const list = this.state.skills
			.filter((skill) => skill.projectId === projectId)
			.map((skill) => <Button label={skill.skill.name} margin="small" size="small" plain />);
		return list;
	};
	VolunteerHoursOnaProject = (volunteerId, projectId) => {
		const hoursOnProject = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId && hours.projectId === projectId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return hoursOnProject;
	};
	ProjectVolunteerList = (projectId) => {
		const projectVolunteerList = this.state.volunteers
			.filter((volunteer) => volunteer.projectId === projectId)
			.map((volunteer) => (
				<TableRow>
					<TableCell>{volunteer.volunteer.name}</TableCell>
					<TableCell>
						<Moment format="MM/DD/YYYY">{volunteer.date}</Moment>
					</TableCell>
					<TableCell>{this.VolunteerHoursOnaProject(volunteer.volunteerId, volunteer.projectId)}</TableCell>
				</TableRow>
			));
		return projectVolunteerList;
	};
	findVolunteerId = (name) => {
		const volunteer = this.state.options.find((volunteer) => volunteer.name === name);
		return volunteer;
	};

	constructNewVolProj = (evt) => {
		evt.preventDefault();
		const volunteer = {
			volunteerId: this.state.value,
			projectId: parseInt(this.props.match.params.volunteerId),
			date: new Date()
		};

		// Create the volunteer and redirect user to volunteer list
		this.props.addToProject(volunteer).then(() => {
			this.onCloseProjectList();
			const newState = {};
			api.getExpanded('volunteersProjects', 'project').then((parsedProjects) => {
				newState.projects = parsedProjects;
				this.setState(newState);
			});
		});
	};

	componentDidMount() {
		const newState = {
			options: this.props.volunteers.map((volunteer) => {
				return { name: volunteer.name, id: volunteer.id };
			})
		}; //This only works when directing from the projectlist. If I refresh the page, it doesn't. //
		api.getExpanded('projectsSkills', 'skill').then((parsedSkills) => {
			newState.skills = parsedSkills;
			api.getExpanded('volunteersProjects', 'volunteer').then((parsedVolunteers) => {
				newState.volunteers = parsedVolunteers;
				this.setState(newState);
			});
		});
	}

	render() {
		const { openDelete, openVolunteerList, value } = this.state;
		const project = this.props.projects.find((a) => a.id === parseInt(this.props.match.params.projectId)) || {};
		return (
			<Box key={project.id} direction="row" width="horizontal" basis="full">
				<Box direction="column" width="90vw">
					<Box direction="row" justify="between" width="horizontal" elevation="medium">
						<Box direction="column" justify="end">
							<Heading level={3} alignSelf="start">
								{project.name}
							</Heading>
							<Paragraph size="small">{project.shortDescription} </Paragraph>
							<Text size="medium">
								{' '}
								{this.totalHours(project.id)} total hours of service performed by Volunteers
							</Text>
						</Box>

						<Box id="icons" direction="row">
							<Anchor onClick={this.onOpenVolunteerList} margin="small">
								<AddCircle />
							</Anchor>
							{openVolunteerList && (
								<Layer position="top-right">
									<Box height="small" overflow="auto" elevation="medium">
										<Box pad="small">Select a Volunteer</Box>
										<Box pad="medium">
											<Form>
												<Select
													id="volunteerOptions"
													name="volunteerOptions"
													placeholder="Select a Volunteer"
													value={value}
													options={this.state.options.map((options) => options.name)}
													onChange={({ option }) =>
														this.setState({
															volunteerName: option,
															value: this.findVolunteerId(option).id
														})}
												/>
												<Button
													icon={<Checkmark />}
													onClick={this.constructNewVolProj}
													label="Add to Project"
												/>
											</Form>
										</Box>
										<Box align="center">
											<Button icon={<Close />} onClick={this.onCloseVolunteerList} />
										</Box>
									</Box>
								</Layer>
							)}
							<Anchor
								onClick={() => {
									this.props.history.push(`/projects/${project.id}/edit`);
								}}
								margin="small"
							>
								<Edit />
							</Anchor>
						</Box>
					</Box>
					<Box direction="row" elevation="medium" justify="evenly">
						<Box width="25vw" direction="column">
							<Box direction="column">
								<Heading level={5}>Project Details</Heading>
								<Text size="small">
									<strong>Location:</strong>
									{project.street}, {project.city}, {project.State}, {project.zip}
								</Text>
								<Text size="small">
									<strong>Volunteer Age Range:</strong> {project.minAge + ' - ' + project.maxAge}
								</Text>
								<Text size="small">
									<strong>Maximum Volunteers Needed:</strong> {project.maxVolunteers}
								</Text>
								<Text size="small">
									<strong>Experience Required:</strong> {project.experience}
								</Text>
								<Text size="small">
									<strong>Restrictions:</strong> {project.restrictions}
								</Text>
								<Text size="small" width="20vw">
									<strong>Notes:</strong>
									{project.specialInstructions}
								</Text>

								<Heading level={5}>Skills Required</Heading>
								{/* I'd like to add another modal that opens on edit of the skills*/}
								{this.skillList(project.id)}
							</Box>
							<Box>
								<Anchor onClick={this.onOpenDelete} margin="small">
									<Trash /> Delete Project
								</Anchor>
								{/* Change Delete to Archive, so that project.active returns false and adds a end Date option as well*/}
								{openDelete && (
									<Layer position="top-left">
										<Box height="small" overflow="auto" elevation="medium">
											<Box pad="medium">
												Are you sure you want to delete {project.name}? This is permanent and
												cannot be undone! It will break everything.
											</Box>
											<Box pad="medium">
												<Button
													icon={<Trash />}
													onClick={() => {
														this.props.delete(project.id);
													}}
													label="Yes, Delete It!"
												/>
												<Button
													primary
													icon={<Close />}
													onClick={this.onCloseDelete}
													label="No, Nevermind"
												/>
											</Box>
										</Box>
									</Layer>
								)}
							</Box>
						</Box>

						<Box elevation="small" fill>
							<Box>
								<Heading level={5}>Volunteers Assigned</Heading>
								<Table>
									<TableHeader>
										<TableRow>
											<TableCell scope="col">Volunteer Name</TableCell>
											<TableCell scope="col">Date Assigned</TableCell>
											<TableCell scope="col">Hours</TableCell>
										</TableRow>
									</TableHeader>
									<TableBody>{this.ProjectVolunteerList(project.id)}</TableBody>
								</Table>
							</Box>
						</Box>
					</Box>
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
