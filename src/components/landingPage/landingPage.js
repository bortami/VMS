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
