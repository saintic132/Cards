import React, {ChangeEvent} from 'react';

type SelectValueType = {
    selectValue: number
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({selectValue, handleSelectChange}: SelectValueType) => {

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        handleSelectChange(e)
    }

    return (
        <div>
            <select value={selectValue} onChange={selectHandler}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};

export default Select;