import { useQuery } from 'react-query';
import { service } from '../services';
import { queryKeys } from '../constants/index';
import { useRecoilValue } from 'recoil';
import { workflowPaginationAtom } from '../atoms';

const getWorkflows = async ({ pageNo, pageSize, workFlowId }) => {
  const { data } = await service.get(`/v1/admin/workflow`, {
    params: {
      pageNo,
      pageSize,
      workFlowId,
    },
  });
  return data;
};

export const useWorkflows = ({ workflowId = undefined } = {}) => {
  const { page } = useRecoilValue(workflowPaginationAtom);
  return useQuery([queryKeys.Workflows, page, workflowId], () =>
    getWorkflows({ pageNo: page, pageSize: 39, workFlowId: workflowId })
  );
};
