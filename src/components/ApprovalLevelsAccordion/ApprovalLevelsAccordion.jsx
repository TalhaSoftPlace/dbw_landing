import React from 'react';
import { Wrapper } from './ApprovalLevelsAccordion.style';
import { AccordionItem } from './AccordionItem';
export const ApprovalLevelsAccordion = React.memo(
  ({
    firstApprovals,
    setFirstApprovals,
    secondApprovals,
    setSecondApprovals,
    thirdApprovals,
    setThirdApprovals,
    allApprovals,
    selectedUsers,
  }) => {
    const [expanded, setExpanded] = React.useState(1);
    return (
      <Wrapper>
        <AccordionItem
          allApprovals={allApprovals}
          item={{ id: 1, name: 'First Approval' }}
          expanded={expanded === 1}
          onChange={() => setExpanded(1)}
          selectedUsers={selectedUsers}
          selectedItems={firstApprovals}
          setSelectedItems={setFirstApprovals}
        />
        {!!firstApprovals.length && (
          <AccordionItem
            allApprovals={allApprovals}
            selectedUsers={selectedUsers}
            item={{ id: 2, name: 'Second Approval' }}
            expanded={expanded === 2}
            onChange={() => setExpanded(2)}
            selectedItems={secondApprovals}
            setSelectedItems={setSecondApprovals}
          />
        )}
        {!!secondApprovals.length && (
          <AccordionItem
            allApprovals={allApprovals}
            selectedUsers={selectedUsers}
            item={{ id: 3, name: 'Third Approval' }}
            expanded={expanded === 3}
            onChange={() => setExpanded(3)}
            selectedItems={thirdApprovals}
            setSelectedItems={setThirdApprovals}
          />
        )}
      </Wrapper>
    );
  }
);
