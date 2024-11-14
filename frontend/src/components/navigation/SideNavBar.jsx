import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import ImageIcon from '@mui/icons-material/Image';
import InfoIcon from '@mui/icons-material/Info';
import { Link, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthAxios from '../axios/AuthAxios'
import { useNavigate } from 'react-router-dom';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import PropTypes from 'prop-types';
import styles from './navigations.module.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

export default function SideNavBar(props) {
  const { content } = props;
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    mockups: false,
    designs: false,
  });

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh') || sessionStorage.getItem('refresh');
      if (!refreshToken) {
        throw new Error('No refresh token found.');
      }
      await AuthAxios.post('/logout/', { refresh: refreshToken });
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('refresh');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (menuName) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuName]: !prevOpenMenus[menuName], // Toggle the selected submenu
    }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleCollapse}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            theOne
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: collapsed ? collapsedDrawerWidth : drawerWidth,
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
          },
        }}
        sx={{
          width: collapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', overflowX: 'hidden', flexGrow: 1 }}>
          <List>
            <ListItem key={1} disablePadding>
              <Tooltip title={collapsed ? 'Home' : ''} placement="right">
                <ListItemButton
                  component={Link}
                  to="/apphome"
                  selected={'/apphome' === path}
                >
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  {!collapsed && <span className={styles.sideBarLink}>Home</span>}
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {/* Designs Menu */}
            <ListItem key={2} disablePadding>
              <Tooltip title={collapsed ? 'Designs' : ''} placement="right">
                <ListItemButton onClick={() => handleMenuClick("designs")}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <span className={styles.sideBarLink}>Designs</span>
                      {openMenus.designs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </>
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {openMenus.designs && !collapsed && (
              <Box sx={{ pl: 4 }}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/designs" selected={'/designs' === path}>
                    <ListItemIcon />
                    <span className={styles.sideBarLink}>All Designs</span>
                  </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding>
                  <ListItemButton component={Link} to="/designs/new" selected={'/designs/new' === path}>
                    <ListItemIcon />
                    <span className={styles.sideBarLink}>New Design</span>
                  </ListItemButton>
                </ListItem> */}
              </Box>
            )}

            {/* Mockups Menu */}
            <ListItem key={3} disablePadding>
              <Tooltip title={collapsed ? 'Mockups' : ''} placement="right">
                <ListItemButton onClick={() => handleMenuClick("mockups")}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  {!collapsed && (
                    <>
                      <span className={styles.sideBarLink}>Mockups</span>
                      {openMenus.mockups ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </>
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {openMenus.mockups && !collapsed && (
              <Box sx={{ pl: 4 }}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/mockups" selected={'/mockups/all' === path}>
                    <ListItemIcon />
                    <span className={styles.sideBarLink}>All Mockups</span>
                  </ListItemButton>
                </ListItem>
                {/* <ListItem disablePadding>
                  <ListItemButton component={Link} to="/mockups/new" selected={'/mockups/new' === path}>
                    <ListItemIcon />
                    <span className={styles.sideBarLink}>New Mockup</span>
                  </ListItemButton>
                </ListItem> */}
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/mockups/libraries" selected={'/mockups/new' === path}>
                    <ListItemIcon />
                    <span className={styles.sideBarLink}>Libraries</span>
                  </ListItemButton>
                </ListItem>
              </Box>
            )}

            <ListItem key={4} disablePadding>
              <Tooltip title={collapsed ? 'Products' : ''} placement="right">
                <ListItemButton
                  component={Link}
                  to="/products"
                  selected={'/products' === path}
                >
                  <ListItemIcon>
                    <PsychologyAltIcon />
                  </ListItemIcon>
                  {!collapsed && <span className={styles.sideBarLink}>Products</span>}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ marginTop: 'auto', paddingBottom: 2 }}>
          <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && <span className={styles.sideBarLink}>Logout</span>}
            </ListItemButton>
          </Tooltip>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}

SideNavBar.propTypes = {
  content: PropTypes.node,
};