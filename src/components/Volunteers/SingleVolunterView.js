import React, { Component } from 'react';
import api from '../../modules/apiManager';
import { Box, Image, Heading, Anchor, Layer, Button, Select } from 'grommet';
import { MailOption, AddCircle, Trash, Close } from 'grommet-icons';

export default class SingleVolunteerView extends Component {
	state = {
		openDelete: undefined,
		openProjectList: undefined,
		value: '',
		options: [],
		projectName: '',
	};

	onOpenDelete = () => this.setState({ openDelete: true });
	onOpenProjectList = () => this.setState({ openProjectList: true });

	onCloseDelete = () => this.setState({ openDelete: undefined });
	onCloseProjectList = () => this.setState({ openProjectList: undefined });

	componentDidMount() {
		const options = this.props.projects.map((project) => project.name)
		this.setState({options: options})
		//This doesn't work and I don't know why//
	}

	render() {
		const { openDelete, openProjectList, value, options } = this.state;
		const volunteer =
			this.props.volunteers.find((a) => a.id === parseInt(this.props.match.params.volunteerId)) || {};
		return (
			<Box key={volunteer.id} direction="column" width="horizontal">
				<Box direction="row" align="between" width="horizontal">
					<Box alignSelf="start">
						<Image src={volunteer.image} />
					</Box>
					<Heading level={3}>{volunteer.name}</Heading>
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
									<Box pad="medium">Select a Project:</Box>
									<Box pad="medium">
										<Select
											id="projectOptions"
											name="projectOptions"
											placeholder="Select a Project"
											value={value}
											options={options}
											onChange={({ option }) => this.setState({ projectName: option, value: option })}
										/>
									</Box>
									<Box align="center">
										<Button icon={<Close />} onClick={this.onCloseProjectList} />
									</Box>
								</Box>
							</Layer>
						)}
						<Anchor onClick={this.onOpenDelete} margin="small">
							<Trash />
						</Anchor>
						{openDelete && (
							<Layer position="top-right">
								<Box height="small" overflow="auto" elevation="medium">
									<Box pad="medium">
										Are you sure you want to delete {volunteer.name.split(' ')[0]}? This is
										permanent and cannot be undone!
									</Box>
									<Box pad="medium">
										<Button
											icon={<Trash />}
											onClick={this.props.delete(volunteer.id)}
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
			</Box>
		);
	}
}
