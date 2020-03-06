import { withRouter } from 'react-router-dom';

import { styles } from './styles';
import PostEditable from './PostEditable';

import { withStyles } from '@material-ui/core';

export default withRouter(withStyles(styles)(PostEditable));
