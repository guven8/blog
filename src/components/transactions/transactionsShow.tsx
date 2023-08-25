import { useShow, IResourceComponentsProps, useOne } from '@refinedev/core';
import { Show, TextField, DateField } from '@refinedev/chakra-ui';
import { Heading } from '@chakra-ui/react';

export const TransactionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: signingGroupData, isLoading: signingGroupIsLoading } = useOne({
    resource: 'signingGroups',
    id: record?.signingGroupId || '',
    queryOptions: {
      enabled: !!record
    }
  });

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        Id
      </Heading>
      <TextField value={record?.id} />
      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <TextField value={record?.title} />
      <Heading as="h5" size="sm" mt={4}>
        Status
      </Heading>
      <TextField value={record?.status} />
      <Heading as="h5" size="sm" mt={4}>
        Signing Group
      </Heading>
      {signingGroupIsLoading ? (
        <>Loading...</>
      ) : (
        <>{signingGroupData?.data?.name}</>
      )}
      <Heading as="h5" size="sm" mt={4}>
        Created At
      </Heading>
      <DateField value={record?.createdAt} />
      <Heading as="h5" size="sm" mt={4}>
        Completed At
      </Heading>
      <DateField value={record?.completedAt} />
      <Heading as="h5" size="sm" mt={4}>
        Name
      </Heading>
      <TextField value={record?.name} />
      <Heading as="h5" size="sm" mt={4}>
        Description
      </Heading>
      <TextField value={record?.description} />
      <Heading as="h5" size="sm" mt={4}>
        Reference
      </Heading>
      <TextField value={record?.reference} />
    </Show>
  );
};
