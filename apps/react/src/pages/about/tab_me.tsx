import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { CardWrapper } from "../card";
export function TabMe() {
  return (
    <Box sx={{ display: "flex", width: "100%", gap: "5px" }}>
      <Card variant="outlined" sx={{ width: "400px" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 200, height: 200 }}
            src="https://res.cloudinary.com/dwawh39gc/image/upload/v1735591211/Ryan_Igo5423_-400x400-c-default_kjh0au.jpg"
          />
          <Typography variant="h5">Ryan Igo</Typography>
          <Typography variant="h6">Full Stack Developer</Typography>
        </CardContent>
      </Card>
      <CardWrapper
        title="About"
        body={`
        I am a full stack developer with over 7 years of specialized experience in React and Node.js, 
        driven by creating solutions that bridge people, process, and technology. My approach combines 
        technical expertise with strong collaboration skills to deliver high-impact results. I thrive 
        on complex challenges and continuously expanding my skillset, making me an adaptable and valuable addition to any development team.
        
        As the majority of my work is confidential, I've developed this portfolio to demonstrate my technical capabilities. 
        The site showcases my development expertise using Material UI Premium components, 
        a framework I'm deeply familiar with from professional experience.
      `}
      />
    </Box>
  );
}
