import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "0 auto 20px",
    textAlign: "left",
    backgroundColor: "#f4f4f4"
  },
  media: {
    height: 260,
  },
  username: {
    fontStyle: "italic",
    color: "gray",
    fontWeight: "normal"
  },
  psmall: {
    fontSize: 14
  },
  footer: {
    display: "flex",
    justifyContent: "space-around"
  }
});

function UserCard(props) {
  const { userData } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia 
        className={classes.media}
        image={userData.avatar_url}
        title="github avatar"
      />
      <CardContent className="card-content">
        <h2>{userData.name}</h2>
        <h3 className={classes.username}>{userData.login}</h3>
        <p>{userData.bio}</p>
        <div className={classes.footer}>
          <p className={classes.psmall}>{userData.location}</p>
          <p className={classes.psmall}>Following: {userData.following}</p>
          <p className={classes.psmall}>Followers: {userData.followers}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard;
