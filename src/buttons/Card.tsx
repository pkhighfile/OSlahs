import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import ShareIcon from "@mui/icons-material/Share";
import Switch from '@mui/material/Switch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinkIcon from '@mui/icons-material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Chip from '@mui/material/Chip';
import InviteFormDialog from './InviteMenu';
import FadeMenu from './AccessList';
import { IListItem, reducer, store, stringAvatar } from './DataList';

export default function MultiActionAreaCard() {
    const [checked, setChecked] = React.useState(false);
    const [state, dispatch] = React.useReducer(reducer, store);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardHeader sx={{ bgcolor: 'rgb(245, 245, 245)' }}
                avatar={
                    <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                        <ShareIcon />
                    </Avatar>
                }
                action={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                title="Share to web"
                subheader="Publish and share link with anyone"
            />

            <CardContent>
                <InviteFormDialog state={state} dispatch={dispatch} />

                <List sx={{ width: '100%', bgcolor: 'background.paper', paddingleft: 0 }}>

                    {state.items.length > 0 && state.items.map((x: IListItem) => (
                        <ListItem
                            secondaryAction={
                                <FadeMenu Item={x} state={state} dispatch={dispatch} />
                            }
                            sx={{ paddingLeft: 0 }}
                            key={x.Id}
                        >
                            <ListItemAvatar>
                                <Avatar {...stringAvatar(x.Name)} />
                            </ListItemAvatar>
                            <ListItemText primary={x.Name} />
                        </ListItem>
                    ))}
                    <ListItem
                        secondaryAction={
                            <FadeMenu Item={state.items} state={state} dispatch={dispatch} />
                        }
                        sx={{ paddingLeft: 0 }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <ShareIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Everyone at OSlash" secondary="25 workspace members" />
                    </ListItem>
                </List>

            </CardContent>

            <CardActions sx={{ bgcolor: 'rgb(245, 245, 245)' }}>
                <HelpOutlineIcon color="disabled" />
                <Typography variant="subtitle2" color="text.secondary">
                    learn about sharing
                </Typography>
                <Chip sx={{ marginLeft: '130px', bgcolor: 'rgb(245, 245, 245)' }} icon={<LinkIcon sx={{ transform: 'rotate(145deg)' }} />} label="Copy Link" />
            </CardActions>
        </Card>
    );
}


