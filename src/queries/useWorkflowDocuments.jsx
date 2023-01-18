import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useRecoilValue  } from 'recoil';
import { userWorkflowAtom  } from '../atoms';

const getDocuments = async ({ docId, page, size, workflowId, status }) => {
  
  const { data } = await service.get(`/v1/users/workflow/document`, {
    params: {
      docId,
      pageNo: page,
      size, 
      workFlowId: workflowId,
      status: status !== 'all' ? status : undefined,
    },
  });
  return data;
};

export const useWorkflowDocuments = ({
  docId,
  page,
  size = 10,
  workflowId,
}) => {
  const { status } = useRecoilValue(userWorkflowAtom);
  
  return useQuery(
    [queryKeys.WorkflowDocuments, docId, page, size, workflowId, status],
    () => getDocuments({ docId, page, size, workflowId, status }),
    {
      enabled: !!workflowId,
      select: data => {
          
          let items =  data?.content?.map((item) => {
            let approvelLevel;
            const status = item.docStatus?.split('');
            const statusText =
              status && !!status?.find(i => i === 'R')
                ? 'Rejected'
                : !!status?.find((i, idx) => {
                    if (i === 'C' || i === '0') {
                      approvelLevel = idx + 1;
                      return true;
                    }
                    return false;
                  })
                ? 'Waiting For Approval'
                : 'Approved';
            return { ...item, status, statusText, approvelLevel };
          });
        return {items , totalpages:data.totalPages}
      },
    }
  );
};
