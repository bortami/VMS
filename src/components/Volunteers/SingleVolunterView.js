import React, { Component } from 'react';
import api from '../../modules/apiManager';
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
import { MailOption, AddCircle, Trash, Close, Checkmark, Edit } from 'grommet-icons';

export default class SingleVolunteerView extends Component {
	state = {
		openDelete: undefined,
		openProjectList: undefined,
		value: '',
		options: [],
		projectName: '',
		skills: []
	};

	onOpenDelete = () => this.setState({ openDelete: true });
	onOpenProjectList = () => this.setState({ openProjectList: true });

	onCloseDelete = () => this.setState({ openDelete: undefined });
	onCloseProjectList = () => this.setState({ openProjectList: undefined });

	skillList = () => {
		//Error. it works on one go around, then it hits it again and deletes what was placed there, actually it's running everytime I take an action on the page//
		const list = this.state.skills
			.filter((skill) => skill.id === this.state.skills.volunteerId)
			.map((skill) => <Text>{skill.skill.name}</Text>);
		return list;
	};

	componentDidMount() {
		const newState = {};
		const options = this.props.projects.map((project) => project.name); //This doesn't work and I don't know why//
		api.getExpanded('volunteersSkills', 'skill').then((parsedSkills) => {
			newState.skills = parsedSkills;
			this.setState(newState);
		});
	}

	render() {
		const { openDelete, openProjectList, value, options } = this.state;
		const volunteer =
			this.props.volunteers.find((a) => a.id === parseInt(this.props.match.params.volunteerId)) || {};
		return (
			<Box key={volunteer.id} direction="row" width="horizontal" basis="full">
				<Box direction="column" width="90vw">
					<Box direction="row" justify="between" width="horizontal" elevation="medium">
						<Box alignSelf="start">
							<Image width="200px" src={volunteer.image} />
						</Box>
						<Heading level={3} alignSelf="end">
							{volunteer.name}
						</Heading>
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
												<Select
													id="projectOptions"
													name="projectOptions"
													placeholder="Select a Project"
													value={value}
													options={options}
													onChange={({ option }) =>
														this.setState({ projectName: option, value: option })}
												/>
												<Button
													icon={<Checkmark />}
													onClick={() => {}}
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
							<Anchor onClick={this.onOpenDelete} margin="small">
								<Trash />
							</Anchor>
							{openDelete && (
								<Layer position="top-left">
									<Box height="small" overflow="auto" elevation="medium">
										<Box pad="medium">
											Are you sure you want to delete this volunteer? This is permanent and cannot
											be undone!
										</Box>
										<Box pad="medium">
											<Button
												icon={<Trash />}
												onClick={() => {
													this.props.delete(volunteer.id);
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
					</Box>
					<Box direction="row" elevation="medium" justify="evenly">
						<Box elevation="small">
							<Box>
								<Heading level={5}>Contact Details</Heading>
								<Text>{volunteer.phone}</Text>
								<Text>{volunteer.email}</Text>
								<Text>{volunteer.location}</Text>
							</Box>
							<Box>
								<Heading level={5}>Skills</Heading>
								{/* I'd like to add another modal that opens on edit of the skills*/}
								{this.skillList(volunteer.id)}
							</Box>
							<Box elevation="small">
								<Heading level={5}>Admin Notes:</Heading>
								<Paragraph size="small" width="20vw">
									{volunteer.notes}
								</Paragraph>
							</Box>
						</Box>

						<Box elevation="small">
							<Box>
								<Heading level={5}>Projects Assigned</Heading>
								<Table>
									<TableHeader>
										<TableRow>
											<TableCell>Project Name</TableCell>
											<TableCell>Date Assigned</TableCell>
											<TableCell>Hours</TableCell>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell>Project Name</TableCell>
											<TableCell>Date</TableCell>
											<TableCell>##</TableCell>
										</TableRow>
									</TableBody>
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
