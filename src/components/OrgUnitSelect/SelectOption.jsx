import React, { useEffect } from 'react';

const searchRecursive = (data, id) => {
    let found = data.find(d => d.node_id === id);
    if (!found) {
        let i = 0;
        while (!found && i < data.length) {
            if (data[i].children && data[i].children.length) {
                found = searchRecursive(data[i].children, id);
            }
            i++;
        }
    }
    return found;
}

export const SelectOption = React.memo(({ onChange, name, value, setIsOptionsOpen, option, orgUnitList, setLabel }) => {

    const optionSelected = React.useCallback(() => {
        onChange(name, option.node_id);
        setIsOptionsOpen(false);
    }, [onChange, setIsOptionsOpen, name, option.node_id]);

    useEffect(() => {
        const data = searchRecursive(orgUnitList, value);
        if (data) {
            setLabel(data.name);
        }
    }, [value, orgUnitList, setLabel]);

    return (
        <>
            <li
                id={option.node_id}
                role="option"
                aria-selected={value === option.node_id}
                tabIndex={0}
                onClick={optionSelected} 
                className="filterorganization"
            >
                {option.name}
            </li>
            {
                option?.children != null ? <ul className='option-child'>
                    {option.children.map((childoption) => (
                        <SelectOption key={"childoption" + childoption.node_id} {...{ onChange, name, value, setIsOptionsOpen }}
                            option={childoption}
                            orgUnitList={orgUnitList}
                            setLabel={setLabel}
                        />
                    ))}
                </ul> : <></>
            }

        </>
    )
})