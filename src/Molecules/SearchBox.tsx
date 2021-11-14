import React from 'react';
import CustomInput from '../Atoms/CustomInput';

const SearchBox = function (props: any) {
    const { search, callback } = props;
    return <CustomInput value={search} onChange={callback} />;
};

export default SearchBox;
