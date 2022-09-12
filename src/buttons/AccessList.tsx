import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { grey, red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Istate} from './DataList';
export default function FadeMenu(state: Istate) {  
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let menuState = "No Access";
    if(typeof state?.Item?.AccessType !== 'undefined' &&  state?.Item?.AccessType !==""){
        menuState = state.Item.AccessType
    }
    const [menu, setMenu] = React.useState(menuState)

   
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };
    const updateMenu = (item: string) => {
        setMenu(item);
        let updateItem = {
            Id: state?.Item?.Id,
            Name: state?.Item?.Name,
            Type: state?.Item?.Type,
            AccessType: item
        }
        if(typeof updateItem?.Id !== 'undefined' 
            && updateItem?.AccessType !== ""
            && updateItem?.Id !== 0){
            state?.dispatch({ type: "Add", payload: updateItem });
        }   
        handleClose();
    }


    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ fontSize: '11px', textTransform: 'none', color: grey[600] }}
                onClick={handleClick}
            >
                {menu} <ExpandMoreIcon />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem sx={{ fontSize: '11px' }} onClick={() => updateMenu('Full access')}>Full access</MenuItem>
                <MenuItem sx={{ fontSize: '11px' }} onClick={() => updateMenu('Can edit')}>Can edit</MenuItem>
                <MenuItem sx={{ fontSize: '11px' }} onClick={() => updateMenu('Can view')}>Can view</MenuItem>
                <MenuItem sx={{ fontSize: '11px', color: red[200] }} onClick={() => updateMenu("No access")}>No access</MenuItem>
            </Menu>
        </div>
    );
}