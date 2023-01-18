import React, { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';
import { useOrginazationSchema } from '../../queries';
import { filterElements } from '../../utils';
import { SelectWrapper, TextFieldStyled } from './OrgUnitSelect.styles';
import { SelectOption } from './SelectOption';

export const OrgUnitSelect = React.memo(({ value, name, onChange }) => {
    const { data: orgSchema } = useOrginazationSchema();

    const optionsList = React.useMemo(
      () => orgSchema?.children?.[0].children,
      [orgSchema?.children]
    );
    
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [label, setLabel] = useState("");

    const handleOutSideClick = React.useCallback(() => {
        setTimeout(() => {
            if (isOptionsOpen) {
                setIsOptionsOpen(false);
            }
        }, 100);
    }, [isOptionsOpen, setIsOptionsOpen]);
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, handleOutSideClick);

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    const filterOrganizations = React.useCallback((e) => {
        const filter = e.target.value;
        filterElements('filterorganization', filter);
    }, []);

    return (
        <SelectWrapper>
            <div className="wrapper">
                <div className="container">
                    <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={isOptionsOpen}
                        className={isOptionsOpen ? "expanded" : ""}
                        onClick={toggleOptions}
                    >
                        {label}
                    </button>
                    <ul
                        className={`options ${isOptionsOpen ? "show" : ""}`}
                        role="listbox"
                        aria-activedescendant={label}
                        tabIndex={-1}
                        ref={wrapperRef}
                        sx={{boxShadow:'0px 3px 6px #000000038'}}
                    >
                        <TextFieldStyled placeholder='Search...' onChange={filterOrganizations} />
                        {(optionsList && optionsList.length) ? optionsList.map((option, index) => (
                            <SelectOption key={"mainoption" + index} {...{ onChange, name, value, setIsOptionsOpen }} 
                            orgUnitList={optionsList} 
                            option={option}
                            setLabel={setLabel} />
                        )) : <></>}
                    </ul>
                </div>
            </div>
        </SelectWrapper>
    );
});