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
	FormField,
	TextArea
} from 'grommet';
import { MailOption, AddCircle, Trash, Close, Checkmark, Edit, SubtractCircle } from 'grommet-icons';
import './volunteers.css';

const defaultOptions = [];
const objectOptions = [];
api.all('skills').then((skills) =>
	skills.map((skill) => {
		defaultOptions.push(skill.name);
		objectOptions.push({ lab: skill.name, val: skill.id });
		return null;
	})
);

const defaultProjectOptions = [];
const objectProjectOptions = [];
api.all('projects').then((projects) =>
	projects.map((project) => {
		defaultProjectOptions.push(project.name);
		objectProjectOptions.push({ lab: project.name, val: project.id });
		return null;
	})
);
export default class SingleVolunteerView extends Component {
	state = {
		openDelete: undefined,
		openProjectList: undefined,
		openSkillsEdit: undefined,
		showEditBox: undefined,
		value: '',
		options: [],
		projectOptions: objectProjectOptions,
		projects: [],
		skills: [],
		skillnames: objectOptions
	};
	//these are open and close functions for modals and layers//

	onOpenDelete = () => this.setState({ openDelete: true });
	onCloseDelete = () => this.setState({ openDelete: undefined });

	onOpenProjectList = () => this.setState({ openProjectList: true });
	onCloseProjectList = () => this.setState({ openProjectList: undefined });

	onOpenSkillsEdit = () => this.setState({ openSkillsEdit: true });
	onCloseSkillsEdit = () => {
		this.setState({ openSkillsEdit: undefined });
	};
	onShowEditBox = () => this.setState({ showEditBox: true });
	onCloseEditBox = () => this.setState({ showEditBox: undefined });

	//how many hours did a volunteer work in total?//
	totalHours = (volunteerId) => {
		const total = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return total;
	};

	//returns a list of skills
	skillList = (volunteerId) => {
		const list = this.state.skills
			.filter((skill) => skill.volunteerId === volunteerId)
			.map((skill) => <li key={skill.skill.id}>{skill.skill.name}</li>);
		return list;
	};
	deleteVolunteerSkill = (id) => {
		api.delete('volunteersSkills', id).then(() => {
			api.getExpanded('volunteersSkills', 'skill').then((skills) => this.setState({ skills: skills }));
		});
	};
	addNewVolunteerSkill = (skillId) => {
		const newVolunteerSkill = {
			volunteerId: parseInt(this.props.match.params.volunteerId),
			skillId: skillId
		};
		api.post(newVolunteerSkill, 'volunteersSkills').then(() => {
			this.onCloseSkillsEdit();
			const newState = {};
			//shows new skill list on the volunteer's profile//
			api.getExpanded('volunteersSkills', 'skill').then((skills) => {
				newState.skills = skills;
				this.setState(newState);
			});
		});
	};
	//how many hours did the volunteer work on single project? //
	VolunteerHoursOnaProject = (volunteerId, projectId) => {
		const hoursOnProject = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId && hours.projectId === projectId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return hoursOnProject;
	};

	//what projects is the volunteer assigned to? //
	volunteerProjectList = (volunteerId) => {
		const volunteerProjectList = this.state.projects
			.filter((project) => project.volunteerId === volunteerId)
			.map((project) => (
				<TableRow key={project.id}>
					<TableCell>{project.project.name}</TableCell>
					<TableCell>
						<Moment format="MM/DD/YYYY">{project.date}</Moment>
					</TableCell>
					<TableCell>{this.VolunteerHoursOnaProject(project.volunteerId, project.projectId)}</TableCell>
					<TableCell>
						<Button
							plain
							icon={<SubtractCircle />}
							onClick={() => this.removeVolunteerFromProject(project.id)}
						/>
					</TableCell>
				</TableRow>
			));
		return volunteerProjectList;
	};

	findProjectId = (name) => {
		const project = this.state.options.find((project) => project.name === name);
		return project;
	};

	constructNewVolProj = (evt) => {
		evt.preventDefault();
		const volunteer = {
			volunteerId: parseInt(this.props.match.params.volunteerId),
			projectId: document.querySelector('#volunteer-project-select').value,
			date: new Date()
		};

		// Create the volunteer and redirect user to volunteer list
		this.props.addToProject(volunteer).then(() => {
			this.onCloseProjectList();
			api.getExpanded('volunteersProjects', 'project').then((parsedProjects) => {
				this.setState({ projects: parsedProjects });
			});
		});
	};

	removeVolunteerFromProject = (relationshipId) => {
		return fetch(`http://localhost:5002/volunteersProjects/${relationshipId}`, { method: 'DELETE' })
			.then((r) => r.json())
			.then(() => {
				return api.getExpanded('volunteersProjects', 'project').then((projects) => {
					this.setState({ projects: projects });
				});
			});
	};
	updateNotes = () => {
		const editedNote = {
			id: parseInt(this.props.match.params.volunteerId),
			notes: this.state.notes
		};
		api.put('volunteers', editedNote).then(() => {
			this.onCloseEditBox();
			api
				.single('volunteers', this.props.match.params.volunteerId)
				.then((volunteer) => this.setState({ notes: volunteer.notes }));
		});
	};

	handleFieldChange = (evt) => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};
	componentDidMount() {
		const newState = {};
		api.getExpanded('volunteersSkills', 'skill').then((parsedSkills) => {
			newState.skills = parsedSkills;
			api.getExpanded('volunteersProjects', 'project').then((parsedProjects) => {
				newState.projects = parsedProjects;
				this.setState(newState);
			});
		});
	}

	render() {
		const { openDelete, openProjectList, value, skillnames, openSkillsEdit, showEditBox } = this.state;
		const volunteer =
			this.props.volunteers.find((a) => a.id === parseInt(this.props.match.params.volunteerId)) || {};
		return (
			<Box
				key={volunteer.id}
				direction="row"
				width="horizontal"
				fill
				flex="grow"
				overflow="scroll"
				justify="center"
				pad="small"
			>
				<Box direction="column" width="90vw" flex="grow" margin="small" pad="small">
					<Box direction="row" justify="between" width="horizontal" elevation="medium" flex="grow">
						<Box alignSelf="start">
							<Image width="200px" src={volunteer.image} />
						</Box>
						<Box direction="column" justify="end">
							<Heading level={3} alignSelf="start">
								{volunteer.name}
							</Heading>
							<Text size="medium">performed {this.totalHours(volunteer.id)} total hours of service</Text>
						</Box>

						<Box id="icons" direction="row">
							<Anchor href={`mailto:${volunteer.email}`} margin="small">
								<MailOption />
							</Anchor>
							<Anchor onClick={this.onOpenProjectList} margin="small">
								<AddCircle />
							</Anchor>
							{openProjectList && (
								<Layer position="top-right">
									<Box height="small" overflow="auto" elevation="medium">
										<Box pad="small">Select a Project:</Box>
										<Box pad="medium">
											<Form>
												<select name="project-select" id="volunteer-project-select">
													{this.state.projectOptions.map((project) => (
														<option value={project.val} label={project.lab}>
															{project.lab}
														</option>
													))}
												</select>
												<Button
													icon={<Checkmark />}
													onClick={this.constructNewVolProj}
													label="Add to Project"
												/>
											</Form>
										</Box>
										<Box align="center">
											<Button icon={<Close />} onClick={this.onCloseProjectList} />
										</Box>
									</Box>
								</Layer>
							)}
							<Anchor
								onClick={() => {
									this.props.history.push(`/volunteers/${volunteer.id}/edit`);
								}}
								margin="small"
							>
								<Edit />
								{/*This only allows you to edit the volunteer's personal information */}
							</Anchor>
						</Box>
					</Box>
					<Box direction="row" elevation="medium" justify="evenly" flex="grow">
						<Box elevation="small" width="25vw" direction="column" pad="small" flex="grow">
							<Box>
								<Heading level={5}>Contact Details</Heading>
								<Text>{volunteer.phone}</Text>
								<Text>{volunteer.email}</Text>
								<Text>{volunteer.location}</Text>
							</Box>
							<Box>
								<Heading level={5}>
									Skills<Button
										margin="small"
										icon={<Edit />}
										plain
										size="small"
										onClick={this.onOpenSkillsEdit}
									/>
								</Heading>

								{this.skillList(volunteer.id)}

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
													Edit Volunteer's Skills
												</Heading>
												<Button icon={<Close />} onClick={this.onCloseSkillsEdit} />
											</Box>
											<Form
												onSubmit={() => {
													this.state.value.map((value) =>
														this.addNewVolunteerSkill(value.val)
													);
												}}
											>
												<Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
													<FormField label="Remove Skills from Project">
														{this.state.skills
															.filter(
																(skill) =>
																	skill.volunteerId ===
																	parseInt(this.props.match.params.volunteerId)
															)
															.map((skill) => (
																<li key={skill.skill.id}>
																	<Button
																		icon={
																			<SubtractCircle size="small" color="red" />
																		}
																		plain
																		onClick={() =>
																			this.deleteVolunteerSkill(skill.id)}
																	/>{' '}
																	{skill.skill.name}
																</li>
															))}
													</FormField>
													<FormField label="Add Volunteer's Skills">
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
																	skillnames: objectOptions.filter((o) =>
																		exp.test(o.lab)
																	)
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

								<Heading level={5}>
									Admin Notes:<Button
										icon={<Edit />}
										plain
										size="small"
										onClick={this.onShowEditBox}
									/>
								</Heading>
								<Text size="small" width="20vw">
									{volunteer.notes}
									{/*this doesn't update when I update a note. at this point, it's not breaking, so I'm moving on and will come back later to fix it/*/}
								</Text>
								{showEditBox && (
									<Layer
										position="left"
										full="vertical"
										modal
										onClickOutside={this.onCloseEditBox}
										onEsc={this.onCloseEditBox}
									>
										<Box fill="vertical" overflow="auto" width="medium" pad="medium">
											<Box flex={false} direction="row" justify="between">
												<Heading level={2} margin="none">
													Edit Notes for {volunteer.name}
												</Heading>
												<Button icon={<Close />} onClick={this.onCloseEditBox} />
											</Box>
											<Form
												onSubmit={() => {
													this.updateNotes();
												}}
											>
												<Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }} />
												<FormField>
													<TextArea
														placeholder={volunteer.notes}
														onChange={this.handleFieldChange}
														name="notes"
														id="notes"
													/>
												</FormField>
												<Button label="Add Note" type="submit" primary />
											</Form>
										</Box>
									</Layer>
								)}
							</Box>
							<Anchor onClick={this.onOpenDelete} margin="small">
								<Trash /> Delete Volunteer
							</Anchor>
							{openDelete && (
								<Layer position="top-left">
									<Box height="small" overflow="auto" elevation="medium">
										<Box pad="medium">
											Are you sure you want to delete {volunteer.name.split(' ')[0]}? This is
											permanent and cannot be undone!
										</Box>
										<Box pad="medium">
											<Button
												icon={<Trash />}
												onClick={() => {
													this.props.delete(volunteer.id);
													this.props.history.push('/volunteers');
												}}
												label="Yes, Delete Them"
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

						<Box elevation="small" fill>
							<Box>
								<Heading level={5}>Projects Assigned</Heading>
								<Table>
									<TableHeader>
										<TableRow>
											<TableCell scope="col">Project Name</TableCell>
											<TableCell scope="col">Date Assigned</TableCell>
											<TableCell scope="col">Hours</TableCell>
											<TableCell cope="col">Remove</TableCell>
										</TableRow>
									</TableHeader>
									<TableBody>{this.volunteerProjectList(volunteer.id)}</TableBody>
								</Table>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box>
					<Button
						icon={<Close />}
						onClick={() => {
							this.props.history.push('/volunteers');
						}}
					/>
				</Box>
			</Box>
		);
	}
}
