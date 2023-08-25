import { IResourceComponentsProps, useSelect } from '@refinedev/core';
import { Create } from '@refinedev/chakra-ui';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select
} from '@chakra-ui/react';
import { useForm } from '@refinedev/react-hook-form';

export const TransactionCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors }
  } = useForm();

  const { options: signingGroupOptions } = useSelect({
    resource: 'signingGroups',
    optionLabel: 'name'
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          {...register('title', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.title?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.status}>
        <FormLabel>Status</FormLabel>
        <Input
          type="text"
          {...register('status', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.status?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.signingGroupId}>
        <FormLabel>Signing Group</FormLabel>
        <Select
          placeholder="Select signingGroup"
          {...register('signingGroupId', {
            required: 'This field is required'
          })}
        >
          {signingGroupOptions?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors as any)?.signingGroupId?.message as string}
        </FormErrorMessage>
      </FormControl>
      {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
      <FormControl mb="3" isInvalid={!!(errors as any)?.createdAt}>
        <FormLabel>Created At</FormLabel>
        <Input
          {...register('createdAt', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.createdAt?.message as string}
        </FormErrorMessage>
      </FormControl>

      {/* 
                    DatePicker component is not included in "@refinedev/chakra-ui" package.
                    To use a <DatePicker> component, you can examine the following links:
                    
                    - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                    - https://github.com/wojtekmaj/react-date-picker
                */}
      <FormControl mb="3" isInvalid={!!(errors as any)?.completedAt}>
        <FormLabel>Completed At</FormLabel>
        <Input
          {...register('completedAt', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.completedAt?.message as string}
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
      <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          {...register('description', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.description?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!(errors as any)?.reference}>
        <FormLabel>Reference</FormLabel>
        <Input
          type="text"
          {...register('reference', {
            required: 'This field is required'
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.reference?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Create>
  );
};
