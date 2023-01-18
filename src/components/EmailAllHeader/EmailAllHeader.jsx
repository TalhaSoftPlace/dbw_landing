import { Menu } from '@mui/material';
import React, { useRef } from 'react';
import { StyledTable, Wrapper } from './EmailAllHeader.styles';
import { useOutsideClick } from '../../hooks';
import { useEmailHeader } from '../../queries';
import { emailPaginationAtom, selectedEmailAtom } from '../../atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useLocalization } from '../../hooks';
export const EmailAllHeader = React.memo(
  ({ anchorHeaderl, openHeader, onheaderClose, email }) => {
    const { folder: mailBoxFolder } = useRecoilValue(emailPaginationAtom);
    const [selectedEmail] = useRecoilState(selectedEmailAtom);
    const { data: emailHeader } = useEmailHeader({
      uId: selectedEmail.uid,
      mailBoxFolder,
    });
    const ref = useRef();
    useOutsideClick(ref, onheaderClose);
    const { t } = useLocalization();
    return (
      <Menu
        id="email-headerbox"
        anchorEl={anchorHeaderl}
        open={openHeader}
        onClose={onheaderClose}
        MenuListProps={{
          'aria-labelledby': 'checkbox-button',
        }}
      >
        <Wrapper ref={ref}>
          <StyledTable>
            <tr>
              <th>{t.components?.emailAllHeader.messageID}</th>
              <td>{emailHeader?.['Message-ID']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.uID} </th>
              <td>{email?.uid}</td>
            </tr>
            {emailHeader?.['Cc']?.length && (<tr>
              <th>{t.components?.emailAllHeader.Cc} </th>
              <td>{emailHeader?.['Cc']}</td>
            </tr>)}
            {emailHeader?.['Bcc']?.length && (
              <tr>
              <th>{t.components?.emailAllHeader.Bcc} </th>
              <td>{emailHeader?.['Bcc']}</td>
            </tr>
            )}
            <tr>
              <th>{t.components?.emailAllHeader.reference} </th>
              <td>{emailHeader?.['References']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.returnPath} </th>
              <td>{emailHeader?.['Return-Path']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.dkimSignature} </th>
              <td>{emailHeader?.['DKIM-Signature']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xinfo} </th>
              <td>{emailHeader?.['X-Info']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.recieved} </th>
              <td>{emailHeader?.Received}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xFeedbackID} </th>
              <td>{emailHeader?.['X-Feedback-ID']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.form} </th>
              <td>{emailHeader?.From}</td>
            </tr>

            <tr>
              <th>{t.components?.emailAllHeader.xTMID} </th>
              <td>{emailHeader?.['X-TM-ID']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xJMailer} </th>
              <td>{emailHeader?.['X-JMailer']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.date} </th>
              <td>{emailHeader?.Date}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.subject} </th>
              <td>{emailHeader?.Subject}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.mimeVersion} </th>
              <td>{emailHeader?.['MIME-Version']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xVirusScanned} </th>
              <td>{emailHeader?.['X-Virus-Scanned']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xrpcampaign} </th>
              <td>{emailHeader?.['X-rpcampaign']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xUnsubscribeWeb} </th>
              <td>{emailHeader?.['X-Unsubscribe-Web']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.xMailer} </th>
              <td>{emailHeader?.['X-Mailer']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.listUnsubscribe} </th>
              <td>{emailHeader?.['List-Unsubscribe']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.deliveredTo} </th>
              <td>{emailHeader?.['Delivered-To']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.authenticationResult} </th>
              <td>{emailHeader?.['Authentication-Results']}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.to} </th>
              <td>{emailHeader?.To}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.precedence}</th>
              <td>{emailHeader?.Precedence}</td>
            </tr>
            <tr>
              <th>{t.components?.emailAllHeader.contentType} </th>
              <td>{emailHeader?.['Content-Type']}</td>
            </tr>
          </StyledTable>
        </Wrapper>
      </Menu>
    );
  }
);
