import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow, CheckBox } from 'grommet';
import Moment from 'react-moment';

export default class VolunteerListItem extends Component {
	render() {
		return (
			<TableRow>
				<TableCell>
					<CheckBox />
				</TableCell>
				<TableCell>
					<Link id={this.props.volunteer.id} to={`/volunteers/${this.props.volunteer.id}`}>
						{this.props.volunteer.name}
					</Link>
				</TableCell>

				<TableCell>
					<Moment format="MM/DD/YYYY">{this.props.volunteer.dateJoined}</Moment>
				</TableCell>
				<TableCell>{this.props.totalHours(this.props.volunteer.id)}</TableCell>
			</TableRow>
		);
	}
}
