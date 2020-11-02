import React from "react";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Link from '@material-ui/core/Link';
export class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedin: false };
  }

  render() {
    const useStyles = {
      root: {
        width: "50%",
        margin: "auto",
      },
      media:{
        height: "140",
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: "14",
      },
      pos: {
        marginBottom: "12",
      },
      
    };
    const classes = useStyles;

    return (
      <Card style={classes.root} variant="outlined">
        <CardContent>
          {this.props.fileUrl.slice(-3)=="pdf"? (<div> <Link href={"http://localhost:8080/api/"+this.props.fileUrl}> <Typography variant="h6" component="h2"> PdfDowload</Typography><PictureAsPdfIcon></PictureAsPdfIcon></Link></div>): <img src={"http://localhost:8080/api/"+this.props.fileUrl} width="500" height="500" /> }
          <CardActionArea>     
            <Typography variant="h6" component="h2">
              {this.props.text}
            </Typography>
            <Typography style={classes.title} gutterBottom>
              {this.props.status + " - " + this.props.dueDate}
            </Typography>
            <Typography variant="h6" component="h2">
              {this.props.responsible.name}
            </Typography>
          </CardActionArea>
        </CardContent>
      </Card>
    );
  }
}
