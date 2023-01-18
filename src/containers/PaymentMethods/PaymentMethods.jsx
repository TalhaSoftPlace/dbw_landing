import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import {
  ContentSection,
  ContextMenu,
  DBWTable,
} from '../../components';
import { useLocalization } from '../../hooks';
import { StyledSpan, Wrapper } from './PaymentMethods.styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AddNewCard } from '../AddNewCard';
import { usePaymentCards } from '../../queries';
import { useTheme } from '@mui/material';
import {
  useDeleteCardMutation,
  useSetDefaultCardMutation,
} from '../../mutations';
import { useSnackbar } from 'notistack';
const HeaderAction = () => {
  return <AddNewCard />;
};

export const PaymentMethods = React.memo(() => {
  const { mutateAsync: deleteCard } = useDeleteCardMutation();
  const { mutateAsync: setDefaultCard } = useSetDefaultCardMutation();
  var { data: cards = [] } = usePaymentCards();
  const { t } = useLocalization();
  const muiTheme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = useCallback(
    id => {
      deleteCard({ cardId: id }).then(
        enqueueSnackbar('Card Deleted Successfully ', {
          variant: 'success',
        })
      );
    },
    [deleteCard, enqueueSnackbar]
  );

  const handleDefaultCard = useCallback(
    id => {
      setDefaultCard({ cardId: id });
    },
    [setDefaultCard]
  );
  const generateRowContent = useCallback(
    row => {
      const deleteItem = {
        name: (
          <>
            {t.container.paymentMethods.deleteBtn}
          </>
        ),
        onClick: () => handleDelete(row.id),
      };
      const menuItems = [
        { name: 'Default', onClick: () => handleDefaultCard(row.id) },
      ];
      return {
        method: (
          <StyledSpan>
            {row.brand}(********{row.last4})
          </StyledSpan>
        ),
        status: <StyledSpan>{row.defualt ? 'Default' : ''}</StyledSpan>,
        action: (
          <ContextMenu menuItems={row.defualt ? menuItems : [...menuItems, deleteItem]} anchorOrigin="left">
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="1"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </ContextMenu>
        ),
      };
    },
    [handleDefaultCard, handleDelete, t]
  );

  const generateHeader = useCallback(() => {
    return {
      method: <StyledSpan>{t.container.paymentMethods.paymentMethodType}</StyledSpan>,
      status: <StyledSpan>{t.container.paymentMethods.paymentStatus}</StyledSpan>,
      action: <StyledSpan>{t.container.paymentMethods.paymentAction}</StyledSpan>,
    };
  }, [t]);

  return (
    <ContentSection
      heading={t.paymentMethod.heading}
      subHeading={t.paymentMethod.subHeading}
      headerAction={<HeaderAction />}
    >
      <Box sx={{ mb: 1 }} />
      <DBWTable
        generateRowContent={generateRowContent}
        data={cards}
        generateHeader={generateHeader}
        headingBackground={muiTheme.palette.background.dark}
        itemBackground={muiTheme.palette.background.tableitembg}
        headingColor={muiTheme.palette.text.grey}
        itemColor={muiTheme.palette.text.grey}
        padding={20}
      />
      <Wrapper>
      </Wrapper>
    </ContentSection>
  );
});
