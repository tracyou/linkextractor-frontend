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
  UUID: { input: string; output: string; }
}

export interface Annotation {
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['UUID']['output'];
  readonly laws: Law;
  readonly matter: Matter;
  readonly pivot?: Maybe<LawAnnotationPivot>;
  readonly text: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface CreatePancakeInput {
  readonly diameter: Scalars['Int']['input'];
}

export interface CreatePancakeStackInput {
  readonly name: Scalars['String']['input'];
  readonly pancakes: ReadonlyArray<Scalars['ID']['input']>;
}

export interface Law {
  readonly annotations: ReadonlyArray<Annotation>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['UUID']['output'];
  readonly isPublished: Scalars['Boolean']['output'];
  readonly text: Scalars['String']['output'];
  readonly title: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface LawAnnotationPivot {
  readonly comment?: Maybe<Scalars['String']['output']>;
  readonly cursorIndex: Scalars['Int']['output'];
  readonly id: Scalars['UUID']['output'];
}

export interface Matter {
  readonly annotations: ReadonlyArray<Annotation>;
  readonly color: Scalars['String']['output'];
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['UUID']['output'];
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

/** Matter relation enum */
export enum MatterRelationEnum {
  /** Requires one */
  RequiresOne = 'REQUIRES_ONE',
  /** Requires one or more */
  RequiresOneOrMore = 'REQUIRES_ONE_OR_MORE',
  /** Requires zero or more */
  RequiresZeroOrMore = 'REQUIRES_ZERO_OR_MORE',
  /** Requires zero or one */
  RequiresZeroOrOne = 'REQUIRES_ZERO_OR_ONE'
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
  readonly annotationsByLaw: ReadonlyArray<Annotation>;
  readonly laws: ReadonlyArray<Law>;
  readonly matter: Matter;
  readonly matters: ReadonlyArray<Matter>;
  readonly pancakeById: Pancake;
  readonly pancakeStackById: PancakeStack;
  readonly pancakeStacks: ReadonlyArray<PancakeStack>;
  readonly pancakes: ReadonlyArray<Pancake>;
}


export interface QueryAnnotationsByLawArgs {
  lawId: Scalars['UUID']['input'];
}


export interface QueryMatterArgs {
  id: Scalars['UUID']['input'];
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

export type LawFragment = { readonly id: string, readonly title: string, readonly text: string, readonly isPublished: boolean, readonly annotations: ReadonlyArray<SimpleAnnotationFragment> };

export type SimpleLawFragment = { readonly id: string, readonly title: string, readonly text: string, readonly isPublished: boolean };

export type SimpleAnnotationFragment = { readonly id: string, readonly text: string, readonly pivot?: { readonly cursorIndex: number, readonly comment?: string | null } | null };

export type MatterFragment = { readonly id: string, readonly name: string, readonly color: string, readonly annotations: ReadonlyArray<SimpleAnnotationFragment> };

export type SimpleMatterFragment = { readonly id: string, readonly name: string, readonly color: string };

export type MattersQueryVariables = Exact<{ [key: string]: never; }>;


export type MattersQuery = { readonly matters: ReadonlyArray<MatterFragment> };

export type MatterByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type MatterByIdQuery = { readonly matter: MatterFragment };

export const SimpleAnnotationFragmentDoc = gql`
    fragment SimpleAnnotation on Annotation {
  id
  text
  pivot {
    cursorIndex
    comment
  }
}
    `;
export const LawFragmentDoc = gql`
    fragment Law on Law {
  id
  title
  text
  isPublished
  annotations {
    ...SimpleAnnotation
  }
}
    ${SimpleAnnotationFragmentDoc}`;
export const SimpleLawFragmentDoc = gql`
    fragment SimpleLaw on Law {
  id
  title
  text
  isPublished
}
    `;
export const MatterFragmentDoc = gql`
    fragment Matter on Matter {
  id
  name
  color
  annotations {
    ...SimpleAnnotation
  }
}
    ${SimpleAnnotationFragmentDoc}`;
export const SimpleMatterFragmentDoc = gql`
    fragment SimpleMatter on Matter {
  id
  name
  color
}
    `;
export const MattersDocument = gql`
    query matters {
  matters {
    ...Matter
  }
}
    ${MatterFragmentDoc}`;

/**
 * __useMattersQuery__
 *
 * To run a query within a React component, call `useMattersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMattersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMattersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMattersQuery(baseOptions?: Apollo.QueryHookOptions<MattersQuery, MattersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MattersQuery, MattersQueryVariables>(MattersDocument, options);
      }
export function useMattersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MattersQuery, MattersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MattersQuery, MattersQueryVariables>(MattersDocument, options);
        }
export function useMattersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MattersQuery, MattersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MattersQuery, MattersQueryVariables>(MattersDocument, options);
        }
export type MattersQueryHookResult = ReturnType<typeof useMattersQuery>;
export type MattersLazyQueryHookResult = ReturnType<typeof useMattersLazyQuery>;
export type MattersSuspenseQueryHookResult = ReturnType<typeof useMattersSuspenseQuery>;
export type MattersQueryResult = Apollo.QueryResult<MattersQuery, MattersQueryVariables>;
export const MatterByIdDocument = gql`
    query matterById($id: UUID!) {
  matter(id: $id) {
    ...Matter
  }
}
    ${MatterFragmentDoc}`;

/**
 * __useMatterByIdQuery__
 *
 * To run a query within a React component, call `useMatterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatterByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatterByIdQuery(baseOptions: Apollo.QueryHookOptions<MatterByIdQuery, MatterByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatterByIdQuery, MatterByIdQueryVariables>(MatterByIdDocument, options);
      }
export function useMatterByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatterByIdQuery, MatterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatterByIdQuery, MatterByIdQueryVariables>(MatterByIdDocument, options);
        }
export function useMatterByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MatterByIdQuery, MatterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MatterByIdQuery, MatterByIdQueryVariables>(MatterByIdDocument, options);
        }
export type MatterByIdQueryHookResult = ReturnType<typeof useMatterByIdQuery>;
export type MatterByIdLazyQueryHookResult = ReturnType<typeof useMatterByIdLazyQuery>;
export type MatterByIdSuspenseQueryHookResult = ReturnType<typeof useMatterByIdSuspenseQuery>;
export type MatterByIdQueryResult = Apollo.QueryResult<MatterByIdQuery, MatterByIdQueryVariables>;