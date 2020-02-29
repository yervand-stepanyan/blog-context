import { red } from '@material-ui/core/colors';

export const styles = {
  postContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardSection: {
    width: '75%'
  },
  cardWrapper: {
    margin: '20px',
    padding: '20px',
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
  },
  CardContent: {
    padding: 0
  },
  titleSection: {
    display: 'flex',
    padding: '16px 24px'
  },
  avatarSection: {
    margin: 'auto 16px auto 0'
  },
  avatar: {
    backgroundColor: red[500]
  },
  editIcon: {
    marginLeft: 'auto'
  },
  contentSection: {
    padding: '16px 24px'
  },
  contentTextField: {
    width: '100%'
  },
  CardActions: {
    justifyContent: 'flex-end'
  },
  buttonsSection: {
    display: 'flex'
  },
  btnDiv: {
    marginLeft: '20px'
  }
};
