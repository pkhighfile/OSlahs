import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FadeMenu from './AccessList';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActions, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { members, stringAvatar, IListItem, Idispatch } from "./DataList"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function InviteFormDialog(dis: Idispatch) {
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState<IListItem[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Paper>
                <Stack direction="row" spacing={0}>
                    <FormControl size="small" sx={{
                        width: 365
                    }} >
                        <OutlinedInput placeholder="People, emails, groups" onClick={handleClickOpen} />
                    </FormControl>
                    <Button variant="outlined" sx={{ color: grey[900], bgcolor: 'rgb(245, 245, 245)' }}>
                        Invite
                    </Button>
                </Stack>
            </Paper>
            <Dialog open={open} onClose={handleClose} >
                <Card sx={{ minWidth: 500, color: grey[900] }}>
                    <CardContent sx={{ padding: 1, bgcolor: 'rgb(245, 245, 245)' }}>
                        <Stack direction="row" spacing={2}>
                            <Autocomplete
                                multiple
                                limitTags={1}
                                size="small"
                                id="multiple-limit-tags"
                                options={members}
                                autoSelect={true}
                                autoComplete={true}
                                getOptionLabel={(option) => option.Name}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Search emails, names or groups" />
                                )}
                                sx={{ width: '300px', fontSize: '11px' }}
                                onChange={(event, value) => setItem(value)}

                            />
                            <FadeMenu Item={item[0]} state={dis.state} dispatch={dis.dispatch} />
                            <Button variant="outlined" sx={{ color: grey[900], bgcolor: 'white', textTransform: 'none' }} onClick={handleClose}>
                                Invite
                            </Button>
                        </Stack>
                    </CardContent>
                    <CardContent>
                        {displayList(item)}
                    </CardContent>
                    <CardActions sx={{ bgcolor: 'rgb(245, 245, 245)' }}>
                        <HelpOutlineIcon color="disabled" />
                        <Typography variant="subtitle2" color="text.secondary">
                            learn about sharing
                        </Typography>
                    </CardActions>
                </Card>
            </Dialog>
        </div>
    );
}


function displayList(items: any) {
    let displayList = members;
    if (items.length > 0) {
        displayList = items
    }
    let groups = displayList.filter(x => x.Type !== 'P');
    let persons = displayList.filter(x => x.Type === 'P');

    const displayGroup = () => {
        return (groups.length > 0 ? (
            <>
                {typoDisplay("Group")}
                {displayItems(groups)}
            </>) : null)
    }
    const displayPerson = () => {
        return (
            persons.length > 0 ? (<>
                {typoDisplay("Person")}
                {displayItems(persons)}
            </>) : null
        )
    }

    return (
        <>
            {displayGroup()}
            {displayPerson()}
        </>
    )
}

function displayItems(item: any) {
    return (
        <List sx={{ width: '100%', paddingleft: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {item.map((x: IListItem) => (
                <ListItemButton sx={{ paddingLeft: 0 }}>
                    <ListItemAvatar>
                        <Avatar {...stringAvatar(x?.Name)} />
                    </ListItemAvatar>
                    <ListItemText primary={x?.Name} />
                </ListItemButton>
            ))}
        </List>
    )
}

function typoDisplay(x: any) {
    return (
        <Typography variant="subtitle1" gutterBottom>
            Select a {x}
        </Typography>
    )
}
