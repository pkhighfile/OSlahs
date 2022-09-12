import * as React from "react";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import Stack from "@mui/material/Stack";
import MultiActionAreaCard from "./Card"
import { grey } from '@mui/material/colors';

export default function ShareButton() {
  const[ShareCard, SetShareCard] = React.useState(false);
  const update =() => SetShareCard(x => !x);
  
  return (
    <>
    <Stack direction="row" spacing={1}>
      <Button variant="contained" sx={{bgcolor: grey[800]}} endIcon={<ShareIcon />} onClick={update}>
        Share
      </Button> 
    </Stack>
    <br/>
     { ShareCard ?  <MultiActionAreaCard/> : null } 
     </>
  );
}
