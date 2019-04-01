import React, { Component } from 'react';
import { CheckBox, TableCell, TableRow } from 'grommet';
import Moment from "react-moment";

export default class ProjectsListItem extends Component {
	totalVolunteers = (project) => {
		const totalVolunteers = [].reduce((a, b) => a + b, 0);
		if (this.props.volunteers.projectId === project.id) {
			totalVolunteers.concat(1);
			return totalVolunteers;
		} else {
			return 'N/A';
		}
	};
	totalHours = (singleProject) => {
		return "N/A";
	};
	render() {
		return (
			<TableRow>
				<TableCell>
					{' '}
					<CheckBox />
				</TableCell>
				<TableCell>
					<span
						onClick={() => {
							this.props.history.push(`/projects/${this.props.singleProject.id}`);
						}}
					>
						{this.props.singleProject.name}
					</span>
				</TableCell>
				<TableCell><Moment format="MM/DD/YYYY">{this.props.singleProject.date}</Moment></TableCell>
				<TableCell>{this.totalVolunteers(this.props.singleProject)}</TableCell>
				<TableCell>{this.totalHours(this.props.singleProject)}</TableCell>
			</TableRow>
		);
	}
}
