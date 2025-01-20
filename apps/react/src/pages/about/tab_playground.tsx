import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { playGroundDef } from "../playground/def";
import { useNavigate } from "react-router-dom";
export function TabPlayground() {
  const route = useNavigate();
  return (
    <Box sx={{}}>
      <Typography>
        The following features are intended to demonstrate my coding abilities.
      </Typography>
      <div>
        {Object.keys(playGroundDef).map((k, i) => {
          const def = playGroundDef[k as keyof typeof playGroundDef];
          const { title, summary, details } = def.about();
          return (
            <Box key={i} sx={{ padding: "5px" }}>
              <Card variant="outlined">
                <CardActionArea
                  onClick={() => {
                    route(`/app/playground/${def.path}`);
                  }}
                >
                  <CardHeader title={title} />
                  <CardContent>
                    <>{summary}</>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}
