import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

export const AppRouterContextProviderMock = ({ router, params, children }) => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };
  const mockedParams: ReadonlyURLSearchParams = { ...params };
  return (
    <SearchParamsContext.Provider value={mockedParams}>
      <AppRouterContext.Provider value={mockedRouter}>
        {children}
      </AppRouterContext.Provider>
    </SearchParamsContext.Provider>
  );
};
