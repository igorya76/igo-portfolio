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
} from "@mui/material";
import React from "react";
import { FlexBoxAutoHeight } from "../components/max-flex";
import { useBoolean } from "../hooks";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { pageDef } from "../pages/def";
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
              sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
            >
              <Toolbar>
                <IconButton onClick={showMenu.toggle}>
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </>
        }
        body={<Box sx={{ height: "100%" }}>{p.children}</Box>}
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
          <List>
            {pageDef.map((p, k) => {
              return (
                <ListItem key={k}>
                  <ListItemButton component={Link} to={`/${p.path}`}>
                    {p.display}
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
