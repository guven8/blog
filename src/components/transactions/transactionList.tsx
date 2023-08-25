import React from 'react';
import {
  IResourceComponentsProps,
  GetManyResponse,
  useMany
} from '@refinedev/core';
import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  List,
  usePagination,
  EditButton,
  ShowButton,
  DateField
} from '@refinedev/chakra-ui';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  IconButton,
  Box
} from '@chakra-ui/react';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons';

export const TransactionList: React.FC<IResourceComponentsProps> = () => {
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: 'Id'
      },
      {
        id: 'title',
        accessorKey: 'title',
        header: 'Title'
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status'
      },
      {
        id: 'signingGroupId',
        header: 'Signing Group',
        accessorKey: 'signingGroupId',
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            signingGroupData: GetManyResponse;
          };

          const signingGroup = meta.signingGroupData?.data?.find(
            (item) => item.id === getValue<any>()
          );

          return signingGroup?.name ?? 'Loading...';
        }
      },
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        }
      },
      {
        id: 'completedAt',
        accessorKey: 'completedAt',
        header: 'Completed At',
        cell: function render({ getValue }) {
          return <DateField value={getValue<any>()} />;
        }
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: 'Name'
      },
      {
        id: 'description',
        accessorKey: 'description',
        header: 'Description'
      },
      {
        id: 'reference',
        accessorKey: 'reference',
        header: 'Reference'
      },
      {
        id: 'actions',
        accessorKey: 'id',
        header: 'Actions',
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
            </HStack>
          );
        }
      }
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData }
    }
  } = useTable({
    columns
  });

  const { data: signingGroupData } = useMany({
    resource: 'signingGroups',
    ids: tableData?.data?.map((item) => item?.signingGroupId) ?? [],
    queryOptions: {
      enabled: !!tableData?.data
    }
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      signingGroupData
    }
  }));

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
};

type PaginationProps = {
  current: number;
  pageCount: number;
  setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent
}) => {
  const pagination = usePagination({
    current,
    pageCount
  });

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" spacing="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <IconChevronLeft size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === 'string') return <span key={page}>...</span>;

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? 'solid' : 'outline'}
            >
              {page}
            </Button>
          );
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
          >
            <IconChevronRight size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
};
