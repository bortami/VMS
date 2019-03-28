import React, { Component } from 'react';
import { Box, Button, Heading, Paragraph, TextInput, Image } from 'grommet';
import { View, Search } from 'grommet-icons';
import picOne from '../../images/planting.jpeg';
import wordArt from '../../images/wordart.png';
import picTwo from '../../images/babies.jpg';

export default class LandingPage extends Component {
	state = {
		search: '',
		projects: [
			{
				id: 1,
				name: 'Sample Name One',
				location: 'Sample, WV',
				date: new Date(),
				host: 'Alliance for Alliances',
				shortDescription:
					'Think tank impact effective altruism natural resources move the needle academic, to agile inspirational leverage collaborate LGBTQ+. Social impact; leverage her body hze. Scale and impact living a fully ethical life scalable parse radical shared unit of analysis scalable radical unprecedented challenge resist inclusion. Deep dive, communities, shared value social entrepreneurship; collaborate do-gooder, strategize and a, circular white paper dynamic cultivate.'
			},
			{
				id: 2,
				name: 'Sample Name One',
				location: 'Sample, WV',
				date: new Date(),
				host: 'Alliance for Alliances',
				shortDescription:
					'Think tank impact effective altruism natural resources move the needle academic, to agile inspirational leverage collaborate LGBTQ+. Social impact; leverage her body her rights big data targeted black lives matter indicators low-hanging fruit. Uplift big data a; external partners '
			},
			{
				id: 3,
				name: 'Sample Name One',
				location: 'Sample, WV',
				date: new Date(),
				host: 'Alliance for Alliances',
				shortDescription:
					'Replicable impact investing do-gooder engaging social enterprise. Corporate social responsibility collective impact data agile strategize strategize. Scale and impact living a fully ethical life scalable parse radical shared unit of analysis scalable radical unprecedented challenge resist inclusion. Deep dive, communities, shared value social entrepreneurship; collaborate do-gooder, strategize and a, circular white paper dynamic cultivate.'
			}
		]
	};
	handleFieldChange = (e) => {
		const stateToChange = {};
		stateToChange[e.target.id] = e.target.value;
		this.setState(stateToChange);
	};
	render() {
		return (
			<Box direction="column" pad="medium">
				<Box direction="row" pad="medium" align="center" width="50vw">
					<TextInput
						placeholder="Search for Volunteer Opportunities"
						onChange={(e) => this.handleFieldChange(e)}
						id="search"
						name="search-input"
					/>
					<Button icon={<Search />} label="Search" onClick={() => {}} />
				</Box>
				<Box direction="row" pad="small" align="center">
					{this.state.projects.map((project) => {
						return (
							<Box
								elevation="small"
								pad="small"
								key={project.id}
								height="medium"
								margin="small"
								overflow="auto"
							>
								<Box>
									<Heading level={3} truncate margin="0">
										{project.name}
									</Heading>
								</Box>
								{/* <Heading level={6}>{project.location}</Heading>
							<Heading level={6}>{project.date}</Heading> */}
								<Box>
									<Paragraph size="small">{project.shortDescription}</Paragraph>
								</Box>
								<Box alignSelf="end" align="end">
									<Button>
										View More <View />
									</Button>
								</Box>
							</Box>
						);
					})}
				</Box>
				<Box>
					<Heading level={1}>Something Inspirational</Heading>
				</Box>
				<Box direction="row" pad="small" align="center">
					<Box elevation="small" pad="small" height="28vw" width="28vw" margin="small" overflow="auto">
						<Image fit="cover" src={picOne} />
					</Box>
					<Box elevation="small" pad="small" height="28vw" width="28vw" margin="small" overflow="auto">
						<Image fit="cover" src={wordArt} />
					</Box>
					<Box elevation="small" pad="small" height="28vw" width="28vw" margin="small" overflow="auto">
						<Image fit="cover" src={picTwo} />
					</Box>
				</Box>
			</Box>
		);
	}
}
