import { withRouter } from 'react-router-dom';

import { styles } from './styles';
import CreatePost from './CreatePost';

import { withStyles } from '@material-ui/core';

export default withRouter(withStyles(styles)(CreatePost));
