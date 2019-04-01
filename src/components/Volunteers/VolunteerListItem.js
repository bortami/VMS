import React, { Component } from 'react';
import { TableCell, TableRow, CheckBox } from 'grommet';
import Moment from "react-moment"

export default class VolunteerListItem extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>
					<CheckBox />
				</TableCell>
				<TableCell>
					<span
						onClick={() => {
							this.props.history.push(`/profile/${this.props.volunteer.id}`);
						}}
					>
						{this.props.volunteer.name}
					</span>
				</TableCell>

				<TableCell><Moment format="MM/DD/YYYY">{this.props.volunteer.dateJoined}</Moment></TableCell>
				<TableCell>{this.props.totalHours(this.props.volunteer.id)}</TableCell>
			</TableRow>
		);
	}
}
