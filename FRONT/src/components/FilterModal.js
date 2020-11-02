import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { InputLabel,Button, TextField,Select, FormControl } from '@material-ui/core';
import { Fab } from "@material-ui/core";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  
}

const useStyles = (theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state={open:false,responsible:"",status:"",date:""}
    this.handleClose= this.handleClose.bind(this);
    this.handleOpen= this.handleOpen.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen = () => {
    this.setState({open:true});
  };

  handleClose = () => {
      this.setState({open:false});
  };
  render() {
    const { classes } = this.props;  

    return (      
      <div>
        
        <Fab color="primary" onClick={this.handleOpen}>
        <FilterListIcon></FilterListIcon>
        </Fab>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          
              <div style={getModalStyle()} className={classes.paper}>
              <form  onSubmit={this.handleSubmit}>
                <h3>Filter Tool</h3>

                <TextField
                    id="responsible"
                    label="Responsible"
                    name="responsible"
                    onChange={this.handleChange}
                    value={this.state.responsible}>
                </TextField>
                <br/>
                <FormControl>
                
                <TextField
                    id="status"
                    label="Status"
                    name="status"
                    onChange={this.handleChange}
                    value={this.state.status}>
                </TextField>


                </FormControl>
                <br/>
                <br/>

                <InputLabel htmlFor="due-date">
                    Due-date:
                </InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={this.state.date!=""?this.state.date:""}
                  onChange={this.handleDateChange}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>
                <br/>
                <br/>
                <Button onClick={()=>{this.handleSubmit(); this.handleClose();}}
                            variant="contained"
                            color="primary"
                            className="submit">
                    Add 
                </Button>
                <br/>
                <br/>
                <Button variant="contained"
                            color="primary"
                            className="submit"
                            onClick={()=>{this.props.handleFilters("","","")}}>
                                Clear All
                </Button>
            </form>
            </div>
          
        </Modal>
      </div>
    );
  }
  handleChange(e) {
    // Multiple events(2 inputs) in one function
    const value = e.target.value;
    this.setState({[e.target.name]: value});
    this.props.handleFilters("","",""); //Reset Filters
  }
  handleDateChange(e) {
    this.setState({
        date: new Date(e)
    });
}
handleSubmit(e){
    console.log(this.state)
    console.log("DATEEEE" + this.state.date);
    this.props.handleFilters(this.state.date,this.state.responsible,this.state.status);
}

}

export default withStyles(useStyles, { withTheme: true })(FilterModal);
