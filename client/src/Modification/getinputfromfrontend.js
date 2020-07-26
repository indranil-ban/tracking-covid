import React, {useState} from "react";
import { Button, makeStyles, Popover, Typography } from "@material-ui/core";
import Form from "./form";


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));



const SimplePopover = ({data, country}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  
  
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        Subscribe
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {<Form data={data} country={country}></Form>}
          
          
        </Typography>
      </Popover>
    </div>
  );
};

export default SimplePopover;
