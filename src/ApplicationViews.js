import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'grommet';
import LandingPage from './components/landingPage/landingPage';
import VolunteerList from './components/Volunteers/VolunteerList';
import AddVolunteer from './components/Volunteers/addvolunteer';
import SingleVolunteerView from './components/Volunteers/SingleVolunterView';
import SingleVolunteerEditForm from './components/Volunteers/SingleVolunteerEditForm';
import api from './modules/apiManager';
import ProjectList from './components/projects/ProjectsList';
import AddProject from './components/projects/AddProject';

export default class ApplicationViews extends Component {
	state = {
		volunteers: [],
		organizations: [],
		projects: [],
		categories: [],
		skills: [],
		projectSkills: [],
		volunteersProjects: [],
		volunteersSkills: [],
		hours: []
	};

	addVolunteer = (volunteer) =>
		api
			.post(volunteer, 'volunteers')
			.then(() => api.all('volunteers'))
			.then((volunteers) => this.setState({ volunteers: volunteers }));

	deleteVolunteer = (id) => {
		api.deleteAndList('volunteers', id).then((volunteers) => this.setState({ volunteers: volunteers }));
	};

	updateVolunteer = (editedVolunteerObject) => {
		return api.put('volunteers', editedVolunteerObject).then(() => api.all('volunteers')).then((volunteers) => {
			this.setState({
				volunteers: volunteers
			});
		});
	};
	addProject = (project) =>
		api
			.post(project, 'projects')
			.then(() => api.all('projects'))
			.then((projects) => this.setState({ projects: projects }));

	refresh = (what) =>
		api.all(what).then((parsed) => {
			this.setState({ what: parsed });
		});

	componentDidMount() {
		const newState = {};
		api.all('volunteers').then((parsedVolunteers) => {
			newState.volunteers = parsedVolunteers;
			api.all('organizations').then((parsedOrganizations) => {
				newState.organizations = parsedOrganizations;
				api.all('projects').then((parsedProjects) => {
					newState.projects = parsedProjects;
					api.all('categories').then((parsedCategories) => {
						newState.categories = parsedCategories;
						api.all('skills').then((parsedSkills) => {
							newState.skills = parsedSkills;
							api.all('projectsSkills').then((parsedPS) => {
								newState.projectSkills = parsedPS;
								api.all('volunteersProjects').then((parsedvolunteersProjects) => {
									newState.volunteersProjects = parsedvolunteersProjects;
									api.all('volunteersSkills').then((parsedvolunteersSkills) => {
										newState.volunteersSkills = parsedvolunteersSkills;
										api.all('hours').then((parsedHours) => {
											newState.hours = parsedHours;
											this.setState(newState);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}

	render() {
		return (
			<Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
				<Box flex align="center" justify="center">
					<Route
						exact
						path="/login"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/register"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/"
						render={(props) => {
							return <LandingPage {...props} projects={this.state.projects} />;
						}}
					/>
					<Route
						exact
						path="/volunteers"
						render={(props) => {
							return (
								<VolunteerList {...props} volunteers={this.state.volunteers} hours={this.state.hours} />
							);
						}}
					/>
					<Route
						path="/volunteers/add"
						render={(props) => {
							return <AddVolunteer {...props} addVolunteer={this.addVolunteer} />;
						}}
					/>
					<Route
						exact
						path="/volunteers/:volunteerId(\d+)"
						render={(props) => {
							return (
								<SingleVolunteerView
									{...props}
									delete={this.deleteVolunteer}
									route="volunteers"
									volunteers={this.state.volunteers}
									projects={this.state.projects}
									hours={this.state.hours}
								/>
							);
						}}
					/>
					<Route
						path="/volunteers/:volunteerId(\d+)/edit"
						render={(props) => {
							return (
								<SingleVolunteerEditForm
									{...props}
									volunteers={this.state.volunteers}
									projects={this.state.projects}
									skills={this.state.skills}
									updateVolunteer={this.updateVolunteer}
									route="volunteers"
								/>
							);
						}}
					/>
					<Route
						exact
						path="/projects"
						render={(props) => {
							return (
								<ProjectList
									{...props}
									projects={this.state.projects}
									hours={this.state.hours}
									volunteers={this.state.volunteersProjects}
								/>
							);
						}}
					/>
					<Route
						path="/projects/add"
						render={(props) => {
							return <AddProject {...props} addProject={this.addProject} />;
						}}
					/>
					<Route
						path="/projects/edit"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="projects/view"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/reports"
						render={(props) => {
							return null;
						}}
					/>

					<Route
						exact
						path="/profile"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/profile/edit"
						render={(props) => {
							return null;
						}}
					/>

					<Route
						exact
						path="/help"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/help/faq"
						render={(props) => {
							return null;
						}}
					/>

					<Route
						exact
						path="/results"
						render={(props) => {
							return null;
						}}
					/>
				</Box>
			</Box>
		);
	}
}
