import React from "react";
import { FlexBoxAutoHeight } from "../../../components/max-flex";
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import { PlaygroundHeader } from "../header";
import { playGroundDef } from "../def";
import { Internal_SightWords, useSightWordsHook, textMode } from "./context";
import { Speaker, VoiceChat } from "@mui/icons-material";

export function SightWords() {
  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Internal_SightWords>
        <FlexBoxAutoHeight
          header={<>{/* <FilterBar /> */}</>}
          body={<Body />}
          footer={<div></div>}
        />
      </Internal_SightWords>
    </Container>
  );
}

function Body() {
  const context = useSightWordsHook();
  console.log({ context });
  return (
    <div>
      <Card variant="outlined">
        <ConfigureApp />
      </Card>
      <Box>
        <Bottom />
      </Box>
    </div>
  );
}

function ConfigureApp() {
  const context = useSightWordsHook();

  if (!context.mode) {
    return (
      <Box>
        <h2>Select Mode</h2>
        <Button size="large" onClick={() => context.setMode("capital")}>
          Capital
        </Button>
        <Button size="large" onClick={() => context.setMode("lower")}>
          Lower
        </Button>
        <Button size="large" onClick={() => context.setMode("upper")}>
          Upper
        </Button>
      </Box>
    );
  }
  if (!context.active) {
    return (
      <Button
        style={{ width: "100%" }}
        variant="contained"
        size="large"
        onClick={context.setNextWord}
      >
        Get Started
      </Button>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <h1 style={{ fontSize: "100px" }}>
        {textMode(context.mode, context.active)}
      </h1>
      <IconButton
        onClick={() => {
          const msg = new SpeechSynthesisUtterance(context.active);
          window.speechSynthesis.speak(msg);
        }}
      >
        <VoiceChat />
      </IconButton>
    </Box>
  );
}

function Bottom() {
  const context = useSightWordsHook();
  if (context.availableWords.length === 0 && context.active) {
    return (
      <Button
        style={{ width: "100%" }}
        variant="contained"
        size="large"
        onClick={() => context.reset()}
      >
        Finish
      </Button>
    );
  }
  if (!context.active || !context.mode) {
    return <></>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        style={{ width: "100%" }}
        variant="contained"
        size="large"
        onClick={context.setNextWord}
      >
        Next
      </Button>
      <div>{context.availableWords.length} Remaining</div>
    </Box>
  );
}
