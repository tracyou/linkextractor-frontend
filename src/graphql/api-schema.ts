// noinspection JSUnusedGlobalSymbols

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  JSON: { input: string; output: string; }
}

export interface CreatePancakeInput {
  readonly diameter: Scalars['Int']['input'];
}

export interface CreatePancakeStackInput {
  readonly name: Scalars['String']['input'];
  readonly pancakes: ReadonlyArray<Scalars['ID']['input']>;
}

export interface Mutation {
  readonly createPancake: Pancake;
  readonly createPancakeStack: PancakeStack;
  readonly deletePancake: Scalars['Boolean']['output'];
  readonly deletePancakeStack: Scalars['Boolean']['output'];
  readonly updatePancake: Pancake;
  readonly updatePancakeStack: PancakeStack;
}


export interface MutationCreatePancakeArgs {
  input: CreatePancakeInput;
}


export interface MutationCreatePancakeStackArgs {
  input: CreatePancakeStackInput;
}


export interface MutationDeletePancakeArgs {
  id: Scalars['ID']['input'];
}


export interface MutationDeletePancakeStackArgs {
  id: Scalars['ID']['input'];
}


export interface MutationUpdatePancakeArgs {
  input: UpdatePancakeInput;
}


export interface MutationUpdatePancakeStackArgs {
  input: UpdatePancakeStackInput;
}

/** Allows ordering a list of records. */
export interface OrderByClause {
  /** The column that is used for ordering. */
  readonly column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  readonly order: SortOrder;
}

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

export interface Pancake {
  readonly createdAt: Scalars['DateTime']['output'];
  readonly diameter: Scalars['Int']['output'];
  readonly id: Scalars['ID']['output'];
  readonly stack?: Maybe<PancakeStack>;
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface PancakeStack {
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly pancakes: ReadonlyArray<Pancake>;
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface Query {
  readonly pancakeById: Pancake;
  readonly pancakeStackById: PancakeStack;
  readonly pancakeStacks: ReadonlyArray<PancakeStack>;
  readonly pancakes: ReadonlyArray<Pancake>;
}


export interface QueryPancakeByIdArgs {
  id: Scalars['ID']['input'];
}


export interface QueryPancakeStackByIdArgs {
  id: Scalars['ID']['input'];
}

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export interface UpdatePancakeInput {
  readonly diameter: Scalars['Int']['input'];
  readonly id: Scalars['ID']['input'];
}

export interface UpdatePancakeStackInput {
  readonly id: Scalars['ID']['input'];
  readonly name: Scalars['String']['input'];
  readonly pancakes: ReadonlyArray<Scalars['ID']['input']>;
}

export type PancakeFragment = { readonly id: string };

export type PancakeStackFragment = { readonly id: string };

export type PancakesQueryVariables = Exact<{ [key: string]: never; }>;


export type PancakesQuery = { readonly pancakes: ReadonlyArray<PancakeFragment> };

export type PancakeStacksQueryVariables = Exact<{ [key: string]: never; }>;


export type PancakeStacksQuery = { readonly pancakeStacks: ReadonlyArray<PancakeStackFragment> };

export const PancakeFragmentDoc = gql`
    fragment Pancake on Pancake {
  id
}
    `;
export const PancakeStackFragmentDoc = gql`
    fragment PancakeStack on PancakeStack {
  id
}
    `;
export const PancakesDocument = gql`
    query Pancakes {
  pancakes {
    ...Pancake
  }
}
    ${PancakeFragmentDoc}`;

/**
 * __usePancakesQuery__
 *
 * To run a query within a React component, call `usePancakesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePancakesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePancakesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePancakesQuery(baseOptions?: Apollo.QueryHookOptions<PancakesQuery, PancakesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PancakesQuery, PancakesQueryVariables>(PancakesDocument, options);
      }
export function usePancakesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PancakesQuery, PancakesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PancakesQuery, PancakesQueryVariables>(PancakesDocument, options);
        }
export function usePancakesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PancakesQuery, PancakesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PancakesQuery, PancakesQueryVariables>(PancakesDocument, options);
        }
export type PancakesQueryHookResult = ReturnType<typeof usePancakesQuery>;
export type PancakesLazyQueryHookResult = ReturnType<typeof usePancakesLazyQuery>;
export type PancakesSuspenseQueryHookResult = ReturnType<typeof usePancakesSuspenseQuery>;
export type PancakesQueryResult = Apollo.QueryResult<PancakesQuery, PancakesQueryVariables>;
export const PancakeStacksDocument = gql`
    query PancakeStacks {
  pancakeStacks {
    ...PancakeStack
  }
}
    ${PancakeStackFragmentDoc}`;

/**
 * __usePancakeStacksQuery__
 *
 * To run a query within a React component, call `usePancakeStacksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePancakeStacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePancakeStacksQuery({
 *   variables: {
 *   },
 * });
 */
export function usePancakeStacksQuery(baseOptions?: Apollo.QueryHookOptions<PancakeStacksQuery, PancakeStacksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PancakeStacksQuery, PancakeStacksQueryVariables>(PancakeStacksDocument, options);
      }
export function usePancakeStacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PancakeStacksQuery, PancakeStacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PancakeStacksQuery, PancakeStacksQueryVariables>(PancakeStacksDocument, options);
        }
export function usePancakeStacksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PancakeStacksQuery, PancakeStacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PancakeStacksQuery, PancakeStacksQueryVariables>(PancakeStacksDocument, options);
        }
export type PancakeStacksQueryHookResult = ReturnType<typeof usePancakeStacksQuery>;
export type PancakeStacksLazyQueryHookResult = ReturnType<typeof usePancakeStacksLazyQuery>;
export type PancakeStacksSuspenseQueryHookResult = ReturnType<typeof usePancakeStacksSuspenseQuery>;
export type PancakeStacksQueryResult = Apollo.QueryResult<PancakeStacksQuery, PancakeStacksQueryVariables>;