import { useShow, IResourceComponentsProps } from '@refinedev/core';
import { Show, TextField, MarkdownField } from '@refinedev/chakra-ui';
import { Heading } from '@chakra-ui/react';

export const SigningGroupShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm" mt={4}>
        Id
      </Heading>
      <TextField value={record?.id} />
      <Heading as="h5" size="sm" mt={4}>
        Name
      </Heading>
      <TextField value={record?.name} />
      <Heading as="h5" size="sm" mt={4}>
        Public Key
      </Heading>
      <MarkdownField value={record?.publicKey} />
    </Show>
  );
};
