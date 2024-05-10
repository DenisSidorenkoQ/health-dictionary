import * as React from 'react';
import { ReactNode } from 'react';
import {
    Box,
    Tab, Tabs
} from '@mui/material';
import {Link} from "react-router-dom";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {Menu} from "@mui/icons-material";

interface Props {
    children: ReactNode;
}

const navigationItems = [
  {
    title: 'Authorization',
    path: 'login',
    icon: <MeetingRoomIcon />
  },
  {
    title: 'Menu',
    path: 'menu',
    icon: <Menu />
  }
];

const JournalLayout = ({ children }: Props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs value={value} onChange={handleChange} aria-label="Header">
                <Tab style={{height: '100px', width: '200px'}} value="0" icon={navigationItems[0].icon} label={navigationItems[0].title} component={Link} to={navigationItems[0].path} />
                <Tab style={{height: '100px', width: '200px'}} value="1" icon={navigationItems[1].icon} label={navigationItems[1].title} component={Link} to={navigationItems[1].path} />
            </Tabs>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 1, width: {sm: `calc(100% - 250px)`}}}
            >
                {children}
            </Box>
        </>
    );
};


export default JournalLayout;
