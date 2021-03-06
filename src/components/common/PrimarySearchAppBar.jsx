import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ManagerProfile from '../../views/managerPages/common/managerProfile/ManagerProfile';
import profileFallback from '../images.png';
import { logoutUser } from '../../views/login/redux/loginActions';
import ConfirmationBox from '../../views/managerPages/common/ConfirmationBox';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    paddingLeft: 100,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  profile: {
    cursor: 'pointer',
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const [confirmBoxOn, setConfirmBox] = useState(false);
  const [deleteConfirm, setConfirm] = useState(false);
  const title = 'Log out';
  const body = 'Are you sure? Do you want to log out?';
  const option1 = 'Cancel';
  const option2 = 'Yes';
  useEffect(() => {
    if (deleteConfirm === true) {
      dispatch(logoutUser(history));
      setConfirm(false);
    }
  }, [deleteConfirm]);
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            SMART POS SYSTEM
          </Typography>
          {props.isShow && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search???"
                type="text"
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div className="d-flex align-items-center justify-content-center">
            {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
            {/*  <Badge badgeContent={4} color="secondary">*/}
            {/*    <MailIcon />*/}
            {/*  </Badge>*/}
            {/*</IconButton>*/}
            {/*<IconButton aria-label="show 17 new notifications" color="inherit">*/}
            {/*  <Badge badgeContent={17} color="secondary">*/}
            {/*    <NotificationsIcon />*/}
            {/*  </Badge>*/}
            {/*</IconButton>*/}
            <Button
              variant="contained"
              size="small"
              style={{
                height: 30,
                backgroundColor: '#4B76D1',
                color: '#FFF',
                marginRight: 20,
              }}
              onClick={() => setConfirmBox(!confirmBoxOn)}
              className="d-flex align-items-center justify-content-center"
            >
              LOGOUT
            </Button>
            <Avatar
              src={profileFallback}
              onClick={() => setOpen(true)}
              className={classes.profile}
            />
          </div>
          {/*<div className={classes.sectionMobile}>*/}
          {/*  <IconButton*/}
          {/*    aria-label="show more"*/}
          {/*    aria-controls={mobileMenuId}*/}
          {/*    aria-haspopup="true"*/}
          {/*    // onClick={handleMobileMenuOpen}*/}
          {/*    onClick={handleMobileMenuOpen}*/}
          {/*    color="inherit"*/}
          {/*  >*/}
          {/*    <MoreIcon />*/}
          {/*  </IconButton>*/}
          {/*</div>*/}
        </Toolbar>
      </AppBar>
      <ManagerProfile open={open} handleClose={setOpen} />
      {renderMobileMenu}
      {/*{renderMenu}*/}
      <ConfirmationBox
        open={confirmBoxOn}
        handleClose={setConfirmBox}
        title={title}
        description={body}
        option1={option1}
        option2={option2}
        setState={setConfirm}
      />
    </div>
  );
}
