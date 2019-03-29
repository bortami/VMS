import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'grommet';
import LandingPage from './components/landingPage/landingPage';

export default class ApplicationViews extends Component {
	state = {};
	componentDidMount() {}

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
							return (<LandingPage {...props} />);
						}}
					/>
					<Route
						exact
						path="/volunteers"
						render={(props) => {
							return null;
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
