import { withRouter } from 'react-router-dom';

import { styles } from './styles';
import Login from './Login';

import { withStyles } from '@material-ui/core/styles';

export default withRouter(withStyles(styles)(Login));
