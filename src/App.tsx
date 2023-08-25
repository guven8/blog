import { Refine } from '@refinedev/core';
// import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2
} from '@refinedev/chakra-ui';

import { ChakraProvider } from '@chakra-ui/react';
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import {
  AppIcon,
  Header,
  SigningGroupCreate,
  SigningGroupEdit,
  SigningGroupList,
  SigningGroupShow,
  TransactionCreate,
  TransactionEdit,
  TransactionList,
  TransactionShow
} from 'components';

const API_URL = 'https://my-json-server.typicode.com/guven8/api';

function App() {
  return (
    <ChakraProvider theme={RefineThemes.Purple}>
      <BrowserRouter>
        {/* <RefineKbarProvider> */}
        <Refine
          notificationProvider={notificationProvider}
          routerProvider={routerBindings}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: 'transactions',
              list: '/transactions',
              show: '/transactions/show/:id',
              create: '/transactions/create',
              edit: '/transactions/edit/:id'
            },
            {
              name: 'signingGroups',
              list: '/signingGroups',
              show: '/signingGroups/show/:id',
              create: '/signingGroups/create',
              edit: '/signingGroups/edit/:id'
            }
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: '7x0VwD-PI5znD-dV44td'
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2
                  Header={() => <Header sticky />}
                  Title={({ collapsed }) => (
                    <ThemedTitleV2
                      collapsed={collapsed}
                      text="Fraction"
                      icon={<AppIcon />}
                    />
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="transactions" />}
              />
              <Route path="transactions">
                <Route index element={<TransactionList />} />
                <Route path="show/:id" element={<TransactionShow />} />
                <Route path="edit/:id" element={<TransactionEdit />} />
                <Route path="create" element={<TransactionCreate />} />
              </Route>
              <Route path="signingGroups">
                <Route index element={<SigningGroupList />} />
                <Route path="show/:id" element={<SigningGroupShow />} />
                <Route path="edit/:id" element={<SigningGroupEdit />} />
                <Route path="create" element={<SigningGroupCreate />} />
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          {/* <RefineKbar /> */}
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
        {/* </RefineKbarProvider> */}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
