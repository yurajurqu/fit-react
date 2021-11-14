import React, { useState } from 'react';
import { useQuery } from 'react-query';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useLocation } from 'react-router';
import SearchBox from '../Molecules/SearchBox';

async function fetchPeople(pageNum: number, search: string) {
    const response = await fetch(
        `https://swapi.dev/api/people/?page=${pageNum}&search=${search}`
    );
    return response.json();
}

interface LocationState {
    page: number;
    search: string;
}

const People = function () {
    const { state } = useLocation<LocationState>();
    let initialPage = 1;
    let initialSearch = '';
    if (state) {
        const { page, search } = state;
        initialPage = page;
        initialSearch = search;
    }

    const [search, setSearch] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const navigate = useHistory();

    const {
 data, isError, refetch, isLoading
} = useQuery(
        ['people', search, currentPage],
        () => fetchPeople(currentPage, search),
        {
            staleTime: 2000,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setSearch(event.target.value);
        refetch();
    };

    if (isError) {
        return <h3>Oops, something went wrong...</h3>;
    }
    if (isLoading) {
        return <h3>Loading...</h3>;
    }
    if (data.detail === 'Not found') {
        return <h3>Non existent data</h3>;
    }

    return (
        <>
            <div className="container">
                <SearchBox value={search} callback={handleChange} />
                <List className="list-container">
                    {data.results != null
                        && data.results.length > 0
                        && data.results.map((person: any) => (
                            <ListItem key={person.name}>
                                <ListItemText
                                    primary={person.name}
                                    onClick={() => {
                                        navigate.push('/detail', {
                                            people: person,
                                            page: currentPage,
                                            search,
                                        });
                                    }}
                                />
                            </ListItem>
                        ))}
                </List>
            </div>

            {data.results.length === 0 && <p>Sorry, no data was found</p>}
            <div className="pages">
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button
                        disabled={data.previous == null || isLoading}
                        onClick={() => {
                            setCurrentPage(
                                (previousValue) => previousValue - 1
                            );
                        }}
                    >
                        Previous page
                    </Button>
                    <Button>
                        Page {currentPage}
                    </Button>
                    <Button
                        disabled={data.next == null || isLoading}
                        onClick={() => {
                            setCurrentPage(
                                (previousValue) => previousValue + 1
                            );
                        }}
                    >
                        Next page
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
};

export default People;
