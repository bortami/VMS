import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'grommet';
import LandingPage from './components/landingPage/landingPage';
import Volunteers from './components/Volunteers/volunteers';
import api from './modules/apiManager';

export default class ApplicationViews extends Component {
	state = {};

	
	componentDidMount() {
		const newState = {};
		api.all('volunteers').then((parsedVolunteers) => {
			newState.volunteers = parsedVolunteers;
			api.all('organizations').then((parsedOrganizations) => {
				newState.organizations = parsedOrganizations;
				api.all('projects').then((parsedProjects) => {
					newState.projects = parsedProjects;
					api.all('groups').then((parsedGroups) => {
						newState.groups = parsedGroups;
						api.all('organizationAdmin').then((parsedOrganizationAdmin) => {
							newState.organizationAdmin = parsedOrganizationAdmin;
							api.all('categories').then((parsedCategories) => {
								newState.categories = parsedCategories;
								api.all('organizationVolunteer').then((parsedOrganizationVolunteer) => {
									newState.organizationVolunteer = parsedOrganizationVolunteer;
									api.all('groupsVolunteers').then((parsedGroupsVolunteers) => {
										newState.groupsVolunteers = parsedGroupsVolunteers;
										api.all('organizationCategory').then((parsedOrganizationCategory) => {
											newState.organizationCategory = parsedOrganizationCategory;
											api.all('projectCategory').then((parsedProjectCategory) => {
												newState.projectCategory = parsedProjectCategory;
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
							return <LandingPage {...props} projects={this.state.projects} organizations={this.state.organizations}/>;
						}}
					/>
					<Route
						exact
						path="/volunteers"
						render={(props) => {
							return <Volunteers {...props} volunteers={this.state.volunteers} hours={this.state.hours}/>;
						}}
					/>
					<Route
						path="/volunteers/groups"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/volunteers/invite"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/volunteers/blocked"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/volunteers/addvolunteer"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/volunteers/editvolunteer"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/projects"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/projects/create"
						render={(props) => {
							return null;
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
						path="/reports/projects"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/reports/volunteers"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/reports/hours"
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
						path="/organization"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/organization/edit"
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
						path="/help/contact"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						path="/help/tc"
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
					<Route
						exact
						path="/myprojects"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/apply"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/loghours"
						render={(props) => {
							return null;
						}}
					/>
					<Route
						exact
						path="/feedback"
						render={(props) => {
							return null;
						}}
					/>
				</Box>
			</Box>
		);
	}
}
