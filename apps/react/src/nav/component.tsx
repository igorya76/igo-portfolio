import { useNavBarHook } from "./index";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  Button,
  CssBaseline,
  Drawer,
  ListItem,
  List,
  ListItemButton,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import { FlexBoxAutoHeight } from "../components/max-flex";
import { useBoolean } from "../hooks";
import { Menu as MenuIcon, MenuOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { playGroundDef } from "../pages/playground/def";
import { Logo } from "./logo";
const drawerWidth = 240;

export function NavComponentInternals(p: { children: any }) {
  const showMenu = useBoolean(false);
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <FlexBoxAutoHeight
        header={
          <>
            <Toolbar />
            <AppBar
              position="fixed"
              sx={{
                zIndex: (t) => t.zIndex.drawer + 1,
                backgroundColor: "#5e6066",
              }}
            >
              <Toolbar>
                <IconButton onClick={showMenu.toggle}>
                  {showMenu.value ? <MenuOpen /> : <MenuIcon />}
                </IconButton>
                <Box component={Link} to="/app/about">
                  <Logo />
                </Box>
              </Toolbar>
            </AppBar>
          </>
        }
        body={
          <Box sx={{ height: "100%", paddingTop: "20px" }}>{p.children}</Box>
        }
      />
      <Drawer
        hidden={showMenu.value === false}
        variant="permanent"
        sx={{
          width: "200px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List dense>
            <ListItem sx={{ paddingTop: "10px" }}>
              ,
              <ListItemButton
                onClick={showMenu.toggle}
                component={Link}
                to={`/app/about/me`}
              >
                Me
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={showMenu.toggle}
                component={Link}
                to={`/app/about/experience`}
              >
                Experience
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={showMenu.toggle}
                component={Link}
                to={`/app/about/technologies`}
              >
                Technologies
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Typography variant="caption">Playground Tools</Typography>
            </ListItem>
            <Divider />
            {Object.keys(playGroundDef).map((k) => {
              let p = playGroundDef[k];
              return (
                <ListItem key={k}>
                  <ListItemButton
                    onClick={showMenu.toggle}
                    component={Link}
                    to={`/app/playground/${p.path}`}
                  >
                    {p.navDisplay}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
