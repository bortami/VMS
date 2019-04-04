import React, { Component } from 'react';
import api from '../../modules/apiManager';
import Moment from 'react-moment';
import {
	Box,
	Heading,
	Anchor,
	Layer,
	Button,
	Select,
	Form,
	FormField,
	Text,
	Table,
	TableRow,
	TableCell,
	TableHeader,
	TableBody,
	Paragraph
} from 'grommet';
import { AddCircle, Trash, Close, Checkmark, Edit, SubtractCircle } from 'grommet-icons';

const defaultOptions = [];
const objectOptions = [];
api.all('skills').then((skills) =>
	skills.map((skill) => {
		defaultOptions.push(skill.name);
		objectOptions.push({ lab: skill.name, val: skill.id });
		return null;
	})
);
export default class SingleProjectView extends Component {
	state = {
		openDelete: undefined,
		openVolunteerList: undefined,
		openSkillsEdit: undefined,
		value: '',
		options: [],
		volunteers: [],
		skills: [],
		skillnames: objectOptions,
		select: ''
	};
	//this are the open and close functions for the modals and layers//
	onOpenSkillsEdit = () => this.setState({ openSkillsEdit: true });

	onCloseSkillsEdit = () => {
		this.setState({ openSkillsEdit: undefined });
	};

	onOpenDelete = () => this.setState({ openDelete: true });
	onOpenVolunteerList = () => this.setState({ openVolunteerList: true });

	onCloseDelete = () => this.setState({ openDelete: undefined });
	onCloseVolunteerList = () => this.setState({ openVolunteerList: undefined });

	//hours manipulation//
	totalHours = (projectId) => {
		const total = this.props.hours
			.filter((hours) => hours.projectId === projectId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return total;
	};

	//manipulating skills information
	skillList = (projectId) => {
		const list = this.state.skills
			.filter((skill) => skill.projectId === projectId)
			.map((skill) => <li kay={skill.skill.id}>{skill.skill.name} </li>);
		return list;
	};
	deleteProjectsSkill = (id) => {
		api.delete('projectsSkills', id).then(() => {
			api.getExpanded('projectsSkills', 'skill').then((skills) => this.setState({ skills: skills }));
		});
	};
	constructNewProjectSkill = (projectId, skillId) => {
		const newProjectSkill = {
			projectId: projectId,
			skillId: skillId
		};
		api.post(newProjectSkill, 'projectsSkills');
	};

	VolunteerHoursOnaProject = (volunteerId, projectId) => {
		const hoursOnProject = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId && hours.projectId === projectId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return hoursOnProject;
	};
	removeVolunteerFromProject = (relationshipId) => {
		return fetch(`http://localhost:5002/volunteersProjects/${relationshipId}`, { method: 'DELETE' })
			.then((r) => r.json())
			.then(() => {
				return api.getExpanded('volunteersProjects', 'volunteer').then((projects) => {
					this.setState({ volunteers: projects });
				});
			});
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
					<TableCell>
						<Button
							plain
							onClick={() => this.removeVolunteerFromProject(volunteer.id)}
							icon={<SubtractCircle />}
						/>
					</TableCell>
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
			projectId: parseInt(this.props.match.params.projectId),
			date: new Date()
		};

		// Create the volunteer to Project relationship
		this.props.addToProject(volunteer).then(() => {
			this.onCloseVolunteerList();
			const newState = {};
			// and displays an updated volunteer list
			api.getExpanded('volunteersProjects', 'volunteer').then((parsedVolunteers) => {
				newState.volunteers = parsedVolunteers;
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
		const { openDelete, openVolunteerList, openSkillsEdit, value, skillnames } = this.state;
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

								<Heading level={5}>
									Skills Required<Button
										margin="small"
										icon={<Edit />}
										plain
										size="small"
										onClick={this.onOpenSkillsEdit}
									/>
								</Heading>
								{/* I'd like to add another modal that opens on edit of the skills*/}
								{this.skillList(project.id)}
							</Box>

							{openSkillsEdit && (
								<Layer
									position="right"
									full="vertical"
									modal
									onClickOutside={this.onCloseSkillsEdit}
									onEsc={this.onCloseSkillsEdit}
								>
									<Box fill="vertical" overflow="auto" width="medium" pad="medium">
										<Box flex={false} direction="row" justify="between">
											<Heading level={2} margin="none">
												Edit Project's Skills
											</Heading>
											<Button icon={<Close />} onClick={this.onCloseSkillsEdit} />
										</Box>
										<Form
											onSubmit={() => {
												this.state.value.map((value) => {
													this.constructNewProjectSkill(project.id, value.val);
												});
												this.onCloseSkillsEdit();
												return null;
											}}
										>
											<Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
												<FormField label="Remove Skills from Project">
													{this.state.skills.map((skill) => (
														<li key={skill.skill.id}>
															<Button
																icon={<SubtractCircle size="small" color="red" />}
																plain
																onClick={() => this.deleteProjectsSkill(skill.id)}
															/>{' '}
															{skill.skill.name}
														</li>
													))}
												</FormField>
												<FormField label="Add Skills to Project">
													<Select
														size="medium"
														placeholder="Select Skills"
														multiple
														closeOnChange={false}
														disabledKey="dis"
														labelKey="lab"
														valueKey="val"
														value={value}
														options={skillnames}
														onChange={({ value: nextValue }) =>
															this.setState({ value: nextValue })}
														onClose={() => this.setState({ options: objectOptions })}
														onSearch={(text) => {
															const exp = new RegExp(text, 'i');
															this.setState({
																skillnames: objectOptions.filter((o) => exp.test(o.lab))
															});
														}}
													/>
												</FormField>
											</Box>
											<Box flex={false} as="footer" align="start">
												<Button type="submit" label="Submit" primary />
											</Box>
										</Form>
									</Box>
								</Layer>
							)}

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
														this.props.history.push('/projects');
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
											<TableCell cope="col">Remove</TableCell>
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
