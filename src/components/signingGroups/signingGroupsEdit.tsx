import React from 'react';
import { IResourceComponentsProps } from '@refinedev/core';
import { Edit } from '@refinedev/chakra-ui';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from '@chakra-ui/react';
import { useForm } from '@refinedev/react-hook-form';

export const SigningGroupEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm();

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.id}>
        <FormLabel>Id</FormLabel>
        <Input
          disabled
          type="text"
          {...register('id', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.id?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          {...register('name', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.name?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.publicKey}>
        <FormLabel>Public Key</FormLabel>
        <Input
          {...register('publicKey', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.publicKey?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
