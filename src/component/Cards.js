import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
        backgroundColor:"white"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SimpleCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            data: [

            ].sort((a, b) => (a.campus < b.campus ? -1 : 1)),
            page: 0,
            rowsPerPage: 8,
        };
        this.fetchNotis = this.fetchNotis.bind(this);
        this.fetchNotis();
    };

    fetchNotis(){
        fetch(`../../Data/Notifications.json`)
            .then(response => response.json())
            .then(data=>this.setState({data:data.notifications}))
            .catch(e=>{console.log("Fuck error!")})
    }
    render() {
        const { classes } = this.props;
        const { data} = this.state;
        return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        请求
                    </Typography>
                    <Typography variant="headline" component="h2">
                        {data.topic}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {data.teacher}
                    </Typography>
                    <Typography component="p">
                        {data.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Agree</Button>
                    <Button size="small">Reject</Button>
                </CardActions>
            </Card>
        </div>
        )
    }
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
    fetchNotis:PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleCard);