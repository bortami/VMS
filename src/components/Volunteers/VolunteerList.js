import React, { Component } from 'react';
import { Anchor, Box, Button, Select, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import { Add, Search, Trash } from 'grommet-icons';
import Moment from 'react-moment';
import api from '../../modules/apiManager';

export default class VolunteerList extends Component {
	state = {
		search: '',
		volunteers: [],
		value: '',
		options: []
	};
	onOpenProjectList = () => this.setState({ openProjectList: true });
	onCloseProjectList = () => this.setState({ openProjectList: undefined });

	totalHours = (volunteerId) => {
		const hours = this.props.hours
			.filter((hours) => hours.volunteerId === volunteerId)
			.map((hours) => hours.quantity)
			.reduce((a, b) => a + b, 0);
		return hours;
	};

	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};
	findProjectId = (name) => {
		const project = this.state.options.find((project) => project.name === name);
		return project;
	};

	constructNewVolProj = (evt) => {
		evt.preventDefault();
		const volunteer = {
			volunteerId: parseInt(evt.target.id),
			projectId: this.state.value,
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
	render() {
		return (
			<Box
				direction="column"
				pad="medium"
				basis="full"
				fill
				align="center"
				flex
				overflow={{ horizontal: 'hidden' }}
			>
				{/*This is the search functionality that has is not ready to be displayed yet. When Search is added, uncomment and display this section*/}
				{/* <Box direction="column" pad="medium" width="50vw" align="center">
					<Box fill="horizontal" direction="row">
						<TextInput
							placeholder="Search by Name or email address"
							onChange={(e) => this.handleFieldChange(e)}
							id="search"
							name="search-input"
						/>
						<Button icon={<Search />} label="Search" onClick={() => {}} />
					</Box>
					<Box direction="row" pad="medium" align="center">
						<Heading level={4} pad="medium">
							Quick Search:{' '}
						</Heading>
						<Button label="Top Hours" />
						<Button label="Top Rated" />
						<Button label="Newest" />
					</Box>
				</Box> */}
				<Box elevation="medium" pad="medium">
					<Box direction="row" justify="between">
						Volunteers
						<Button
							icon={<Add />}
							label="Add Volunteer"
							type="button"
							onClick={() => {
								this.props.history.push('/volunteers/add');
							}}
						/>
					</Box>
					<Table>
						<TableHeader>
							<TableRow>
								<TableCell scope="col">
									<Button icon={<Add color="brand" />} onClick={() => {}} />
								</TableCell>
								<TableCell scope="col">Name</TableCell>
								<TableCell scope="col">Date Joined</TableCell>
								<TableCell scope="col">Hours Logged</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{this.props.volunteers.map((volunteer) => {
								return (
									<TableRow>
										<TableCell>
											<Button
												id={volunteer.id}
												icon={<Add size="small" color="brand" />}
												onClick={() => {}}
											/>
										</TableCell>
										<TableCell>
											<Anchor
												id={volunteer.id}
												onClick={() => {
													this.props.history.push(`/volunteers/${volunteer.id}`);
												}}
											>
												{volunteer.name}
											</Anchor>
										</TableCell>

										<TableCell>
											<Moment format="MM/DD/YYYY">{volunteer.dateJoined}</Moment>
										</TableCell>
										<TableCell>{this.totalHours(volunteer.id)}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Box>
		);
	}
}
