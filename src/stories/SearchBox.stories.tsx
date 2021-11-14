import React from 'react';
import '../App.css';
import SearchBox from '../Molecules/SearchBox';

export const Common = function () {
    // eslint-disable-next-line no-console
    return <SearchBox search="" callback={() => { console.log('changed'); }} />;
};
export default {
    title: 'Searchbox',
};
