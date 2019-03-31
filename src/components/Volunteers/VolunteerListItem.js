import React, { Component } from 'react';
import { TableCell, TableRow } from 'grommet';

export default class VolunteerListItem extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>
					<span
						onClick={() => {
							this.props.history.push(`/profile/${this.props.volunteer.id}`);
						}}
					>
						{this.props.volunteer.name}
					</span>
				</TableCell>

				<TableCell>{this.props.volunteer.dateRegistered}</TableCell>
				<TableCell>{this.props.totalHours(this.props.volunteer.id)}</TableCell>
			</TableRow>
		);
	}
}
