import React, { Component } from 'react';
import { CheckBox, TableCell, TableRow } from 'grommet';
import Moment from 'react-moment';

export default class ProjectsListItem extends Component {
	totalVolunteers = (project) => {
		const totalVolunteers = this.props.volunteers.filter((volunteer) => volunteer.projectId === project.id);
		return totalVolunteers.length;
	};
	totalHours = (project) => null;
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
				<TableCell>
					<Moment format="MM/DD/YYYY">{this.props.singleProject.date}</Moment>
				</TableCell>
				<TableCell>{this.totalVolunteers(this.props.singleProject)}</TableCell>
				<TableCell>{this.totalHours(this.props.singleProject)}</TableCell>
			</TableRow>
		);
	}
}
