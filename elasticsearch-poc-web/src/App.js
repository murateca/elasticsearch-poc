import React, { Component } from 'react';
import axios from 'axios';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import esLogo from './assets/elasticsearch.jpg';
import yellow from '@material-ui/core/colors/yellow';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  page: {
    textAlign: 'center'
  },
  headerCard: {
    minWidth: 550,
    margin: 5,
    backgroundColor: 'gold'
  },
  inputCard: {
    minWidth: 550,
    height: 100,
    margin: 5,
    marginTop: -20,
    paddingTop: 20,
    backgroundColor: 'dodgerBlue'
  },
  media: {
    height: 100,
    width: 400,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  textField: {
    width: 200
  },
  button: {
    margin: 5
  },
  tableCard: {
    minWidth: 275,
    height: 700,
    margin: 5,
    marginTop: -20,
    backgroundColor: 'white ',
    overflow: 'auto'
  },
  resultCard: {
    minWidth: 275,
    height: 100,
    margin: 5,
    marginTop: -20,
    backgroundColor: 'white '
  },
  resultTitle: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: 'black'
  },
  resultText: {
    fontSize: 13,
    textAlign: 'left',
    margin: 10,
    color: 'gray'
  },
  table: {
    minWidth: 700,
    tableLayout: 'auto'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: yellow
  },
  typography: { useNextVariants: true }
});

let rows = [];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      esResults: '',
      openDialog: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleSubmit(event) {
    let t0, t1;
    t0 = t1 = performance.now();
    axios.get('http://localhost:3002/getFromElasticSearch/' + this.state.query).then(res => {
      t1 = performance.now();
      const deltaTime = (t1 - t0).toFixed(2);
      const documents = res.data.hits.hits;
      rows = [];
      if (documents.length !== 0) {
        let id = 0;
        documents.forEach(doc => {
          let rowElement = { id: (id += 1) };
          Object.assign(rowElement, doc._source);
          rows.push(rowElement);
        });
        this.setState({
          esResults: `Found ${documents.length} result in ${deltaTime} miliseconds. Searched ${
            res.data._shards.successful
          } out of ${res.data._shards.total} shards with success in total ${res.data.hits.total} hits. Max score was ${
            res.data.hits.max_score
          }`
        });
      } else {
        this.setState({esResults: ''});
        this.handleOpenDialog();
      }
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
      event.preventDefault();
    }
  }

  handleOpenDialog() {
    this.setState({ openDialog: true });
  }

  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  render() {
    return (
      <Grid className={this.props.classes.page} container spacing={24}>
        <Grid item xs={12}>
          <Card className={this.props.classes.headerCard}>
            <CardMedia className={this.props.classes.media} image={esLogo} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={this.props.classes.inputCard}>
            <MuiThemeProvider theme={theme}>
              <TextField
                className={this.props.classes.textField}
                label="Type something to Search!"
                id="mui-theme-provider-input"
                value={this.state.query}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
            </MuiThemeProvider>
            <IconButton aria-label="Search" onClick={this.handleSubmit}>
              <SearchIcon />
            </IconButton>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={this.props.classes.resultCard}>
            <Typography className={this.props.classes.resultTitle} color="textSecondary" gutterBottom>
              Elasticsearch Results
            </Typography>
            <Typography className={this.props.classes.resultText}>{this.state.esResults}</Typography>
          </Card>
          <Card className={this.props.classes.tableCard}>
            <Table fixedheader="false" className={this.props.classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Client No</TableCell>
                  <TableCell>Citizen Number</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Client Score</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Birth Place</TableCell>
                  <TableCell>Father Name</TableCell>
                  <TableCell>Mother Name</TableCell>
                  <TableCell>Mother Maiden Surname</TableCell>
                  <TableCell>Volume No</TableCell>
                  <TableCell>Family Serial No</TableCell>
                  <TableCell>Serial No</TableCell>
                  <TableCell>Home Address</TableCell>
                  <TableCell>Work Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Post Code</TableCell>
                  <TableCell>Confirmed Address</TableCell>
                  <TableCell>Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.clientNo}
                      </TableCell>
                      <TableCell>{row.citizenNumber}</TableCell>
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>{row.clientScore}</TableCell>
                      <TableCell>{row.birthDate}</TableCell>
                      <TableCell>{row.birthPlace}</TableCell>
                      <TableCell>{row.fatherName}</TableCell>
                      <TableCell>{row.motherName}</TableCell>
                      <TableCell>{row.motherMaidenSurname}</TableCell>
                      <TableCell>{row.volumeNo}</TableCell>
                      <TableCell>{row.familySerialNo}</TableCell>
                      <TableCell>{row.serialNo}</TableCell>
                      <TableCell>{row.homeAddress}</TableCell>
                      <TableCell>{row.workAddress}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.postCode}</TableCell>
                      <TableCell>{row.confirmedAddress}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
          <Dialog
            open={this.state.openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            onKeyPress={this.handleCloseDialog}
          >
            <DialogTitle id="alert-dialog-slide-title">{'Alert!'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">No results have found :/</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
