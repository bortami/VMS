import React, { Component } from "react";
import {Anchor, Box, Button, Heading, Paragraph, TextInput, Image } from "grommet";
import { View, Search } from "grommet-icons";
import picOne from "../../images/planting.jpeg";
import wordArt from "../../images/wordart.png";
import picTwo from "../../images/babies.jpg";

export default class LandingPage extends Component {
  state = {
    search: "",
    projects: [
      {
        id: 1,
        name: "Sample Name One",
        location: "Sample, WV",
        date: new Date(),
        host: "Alliance for Alliances",
        shortDescription:
          "Think tank impact effective altruism natural resources move the needle academic, to agile inspirational leverage collaborate LGBTQ+. Social impact; leverage her body hze. Scale and impact living a fully ethical life scalable parse radical shared unit of analysis scalable radical unprecedented challenge resist inclusion. Deep dive, communities, shared value social entrepreneurship; collaborate do-gooder, strategize and a, circular white paper dynamic cultivate."
      },
      {
        id: 2,
        name: "Sample Name Two",
        location: "Sample, WV",
        date: new Date(),
        host: "Alliance for Alliances",
        shortDescription:
          "Think tank impact effective altruism natural resources move the needle academic, to agile inspirational leverage collaborate LGBTQ+. Social impact; leverage her body her rights big data targeted black lives matter indicators low-hanging fruit. Uplift big data a; external partners "
      },
      {
        id: 3,
        name: "Sample Name Three",
        location: "Sample, WV",
        date: new Date(),
        host: "Alliance for Alliances",
        shortDescription:
          "Replicable impact investing do-gooder engaging social enterprise. Corporate social responsibility collective impact data agile strategize strategize. Scale and impact living a fully ethical life scalable parse radical shared unit of analysis scalable radical unprecedented challenge resist inclusion. Deep dive, communities, shared value social entrepreneurship; collaborate do-gooder, strategize and a, circular white paper dynamic cultivate."
      }
    ]
  };
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };
  render() {
    return (
      <Box
        direction="column"
        pad="medium"
        basis="full"
        fill
        align="center"
        flex
        overflow={{ horizontal: "hidden" }}
      >
        <Box direction="row" pad="medium" width="50vw" align="center">
          <TextInput
            placeholder="Search for Volunteer Opportunities"
            onChange={e => this.handleFieldChange(e)}
            id="search"
            name="search-input"
          />
          <Button icon={<Search />} label="Search" onClick={() => {}} />
        </Box>
        <Box direction="row" pad="medium" height="auto">
          {this.state.projects.map(project => {
            return (
              <Box elevation="medium" pad="0" key={project.id} margin="small">
                <Box pad="0" margin="10px">
                  <Heading level={4} color="basic" margin="none">{project.name}</Heading>
				  <Heading level={6} margin="none">{project.location}</Heading>
				  <Anchor href="/organization/profile">{project.host}</Anchor>
                </Box>
                {/* <Heading level={6}>{project.location}</Heading>
							 */}
                <Box overflow="scroll" pad="small">
                  <Paragraph size="small" pad="small">
                    {project.shortDescription}
                  </Paragraph>
                </Box>
                <Box alignSelf="end" align="end" pad="small" margin="xsmall">
                  <Button icon={<View/>} margin="small" type="button" label="view more">
                   
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box direction="row" pad="medium">
          <Heading alignSelf="center" level={1}>
            Something Inspirational
          </Heading>
        </Box>
        <Box direction="row" pad="medium">
          <Box
            elevation="small"
            pad="small"
            height="medium"
            width="medium"
            margin="small"
            overflow="auto"
          >
            <Image fit="cover" src={picOne} />
          </Box>
          <Box
            elevation="small"
            pad="small"
            height="medium"
            width="medium"
            margin="small"
            overflow="auto"
          >
            <Image fit="cover" src={wordArt} />
          </Box>
          <Box
            elevation="small"
            pad="small"
            height="medium"
            width="medium"
            margin="small"
            overflow="auto"
          >
            <Image fit="cover" src={picTwo} />
          </Box>
        </Box>
      </Box>
    );
  }
}
