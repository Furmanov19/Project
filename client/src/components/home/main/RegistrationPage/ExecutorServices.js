import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);

class ExecutorServices extends React.Component {
  state = {
    expanded: 'false',
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <>
        <ExpansionPanel
          square
          expanded={expanded === 'panel'}
          onChange={this.handleChange('panel')}
        >
          <ExpansionPanelSummary>
            <Typography>Standart Cleaning</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <TextField
            label="Small Room"
            margin="normal"
            name="smallRoom"
            onChange={(Event)=>{ this.props.handleChangeService(Event,"standart")}}
            />
            <TextField
                    label="Large Room"
                    margin="normal"
                    name="largeRoom"
                    onChange={(Event)=>{ this.props.handleChangeService(Event,"standart") }}
            />
            <TextField
                    label="Toilet"
                    margin="normal"
                    name="toilet"
                    onChange={(Event)=>{ this.props.handleChangeService(Event,"standart") }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}

export default ExecutorServices;