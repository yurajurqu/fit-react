import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useLocation } from 'react-router';
import MyHeader from '../Organism/Header';

interface LocationState {
    page: number;
    search: string;
    people: any;
}

const PeopleDetail = function () {
    const navigate = useHistory();

    const loc = useLocation<LocationState>();
    const { state } = loc;
    const { people, page, search } = state;

    const goBack = () => {
        navigate.push('/', { page, search });
    };

    if (!people) return <h2>No people available</h2>;
    const card = (
        <>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Name
                </Typography>
                <Typography variant="h5" component="div">
                    {people.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Birth year: {people.birth_year}
                </Typography>
                <Typography variant="body2">
                    gender {people.gender}
                    <br />
                    height {people.height}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        window.open(people.url);
                    }}
                >
                    Learn More
                </Button>
            </CardActions>
        </>
    );

    return (
        <>
            <MyHeader />
            <div className="container">
                <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined">{card}</Card>
                </Box>
                <Button onClick={goBack}>Return</Button>
            </div>
        </>
    );
};

export default PeopleDetail;
