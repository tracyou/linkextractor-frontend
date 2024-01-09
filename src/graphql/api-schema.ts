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

export interface AnnotatedArticleInput {
  readonly articles: ReadonlyArray<ArticleInput>;
  readonly isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  readonly lawId: Scalars['UUID']['input'];
  readonly title: Scalars['String']['input'];
}

export interface Annotation {
  readonly comment?: Maybe<Scalars['String']['output']>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly definition?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['UUID']['output'];
  readonly laws: Law;
  readonly matter: Matter;
  readonly relationSchema: RelationSchema;
  readonly text: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface AnnotationInput {
  readonly comment?: InputMaybe<Scalars['String']['input']>;
  readonly definition?: InputMaybe<Scalars['String']['input']>;
  readonly matterId: Scalars['UUID']['input'];
  readonly relationSchemaId: Scalars['UUID']['input'];
  readonly text: Scalars['String']['input'];
}

export interface Article {
  readonly annotations: ReadonlyArray<Annotation>;
  readonly id: Scalars['UUID']['output'];
  readonly jsonText?: Maybe<Scalars['JSON']['output']>;
  readonly law: Law;
  readonly text?: Maybe<Scalars['String']['output']>;
  readonly title?: Maybe<Scalars['String']['output']>;
}

export interface ArticleInput {
  readonly annotations: ReadonlyArray<AnnotationInput>;
  readonly articleId: Scalars['UUID']['input'];
  readonly jsonText?: InputMaybe<Scalars['JSON']['input']>;
  readonly text: Scalars['String']['input'];
  readonly title: Scalars['String']['input'];
}

export interface CreatePancakeInput {
  readonly diameter: Scalars['Int']['input'];
}

export interface CreatePancakeStackInput {
  readonly name: Scalars['String']['input'];
  readonly pancakes: ReadonlyArray<Scalars['ID']['input']>;
}

export interface Law {
  readonly articles: ReadonlyArray<Article>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['UUID']['output'];
  readonly isPublished: Scalars['Boolean']['output'];
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
  readonly matterRelations: ReadonlyArray<MatterRelation>;
  readonly name: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface MatterRelation {
  readonly createdAt: Scalars['DateTime']['output'];
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['UUID']['output'];
  readonly matterRelationSchema: MatterRelationSchema;
  readonly relatedMatter: Matter;
  readonly relation: MatterRelationEnum;
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

export interface MatterRelationInput {
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly relatedMatterId: Scalars['UUID']['input'];
  readonly relation: MatterRelationEnum;
}

export interface MatterRelationSchema {
  readonly createdAt: Scalars['DateTime']['output'];
  readonly id: Scalars['UUID']['output'];
  readonly matter: Matter;
  readonly relationSchema: RelationSchema;
  readonly relations: ReadonlyArray<MatterRelation>;
  readonly schemaLayout: Scalars['String']['output'];
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface MatterRelationSchemaInput {
  readonly matterId: Scalars['UUID']['input'];
  readonly relationSchemaId: Scalars['UUID']['input'];
}

export interface MatterRelationType {
  readonly key: MatterRelationEnum;
  readonly value: Scalars['String']['output'];
}

export interface Mutation {
  readonly createPancake: Pancake;
  readonly createPancakeStack: PancakeStack;
  readonly deletePancake: Scalars['Boolean']['output'];
  readonly deletePancakeStack: Scalars['Boolean']['output'];
  readonly publishRelationSchema: RelationSchema;
  readonly saveAnnotatedLaw: Law;
  readonly saveFileXml: XmlFile;
  readonly saveMatterRelationSchema: MatterRelationSchema;
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


export interface MutationPublishRelationSchemaArgs {
  id: Scalars['UUID']['input'];
}


export interface MutationSaveAnnotatedLawArgs {
  input: AnnotatedArticleInput;
}


export interface MutationSaveFileXmlArgs {
  input: XmlFileInput;
}


export interface MutationSaveMatterRelationSchemaArgs {
  input: SaveMatterRelationSchemaInput;
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
  readonly articles: ReadonlyArray<Article>;
  readonly fileXmls: ReadonlyArray<XmlFile>;
  readonly law: Law;
  readonly laws: ReadonlyArray<Law>;
  readonly matter: Matter;
  readonly matterRelationSchema?: Maybe<MatterRelationSchema>;
  readonly matterRelationSchemas: ReadonlyArray<MatterRelationSchema>;
  readonly matterRelationTypes: ReadonlyArray<MatterRelationType>;
  readonly matters: ReadonlyArray<Matter>;
  readonly pancakeById: Pancake;
  readonly pancakeStackById: PancakeStack;
  readonly pancakeStacks: ReadonlyArray<PancakeStack>;
  readonly pancakes: ReadonlyArray<Pancake>;
  readonly relationSchema: RelationSchema;
  readonly relationSchemas: ReadonlyArray<RelationSchema>;
}


export interface QueryLawArgs {
  id: Scalars['UUID']['input'];
}


export interface QueryMatterArgs {
  id: Scalars['UUID']['input'];
}


export interface QueryMatterRelationSchemaArgs {
  input: MatterRelationSchemaInput;
}


export interface QueryPancakeByIdArgs {
  id: Scalars['ID']['input'];
}


export interface QueryPancakeStackByIdArgs {
  id: Scalars['ID']['input'];
}


export interface QueryRelationSchemaArgs {
  id: Scalars['UUID']['input'];
}

export interface RelationSchema {
  readonly annotations: ReadonlyArray<Annotation>;
  readonly createdAt: Scalars['DateTime']['output'];
  readonly expiredAt?: Maybe<Scalars['DateTime']['output']>;
  readonly id: Scalars['UUID']['output'];
  readonly isPublished: Scalars['Boolean']['output'];
  readonly matterRelationSchemas: ReadonlyArray<MatterRelationSchema>;
  readonly updatedAt: Scalars['DateTime']['output'];
}

export interface SaveMatterRelationSchemaInput {
  readonly matterId: Scalars['UUID']['input'];
  readonly matterRelationSchemaId?: InputMaybe<Scalars['UUID']['input']>;
  readonly relationSchemaId?: InputMaybe<Scalars['UUID']['input']>;
  readonly relations: ReadonlyArray<MatterRelationInput>;
  readonly schemaLayout: Scalars['String']['input'];
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

export interface XmlFile {
  readonly content: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly title: Scalars['String']['output'];
}

export interface XmlFileInput {
  readonly content: Scalars['String']['input'];
  readonly title: Scalars['String']['input'];
}

export type LawFragment = { readonly title: string, readonly isPublished: boolean, readonly articles: ReadonlyArray<SimpleArticleFragment> };

export type SimpleLawFragment = { readonly title: string, readonly isPublished: boolean };

export type SimpleArticleFragment = { readonly title?: string | null, readonly text?: string | null, readonly jsonText?: string | null, readonly annotations: ReadonlyArray<SimpleAnnotationFragment> };

export type SimpleAnnotationFragment = { readonly id: string, readonly text: string };

export type MatterFragment = { readonly id: string, readonly name: string, readonly color: string, readonly annotations: ReadonlyArray<SimpleAnnotationFragment> };

export type SimpleMatterFragment = { readonly id: string, readonly name: string, readonly color: string };

export type SimpleMatterRelationFragment = { readonly id: string, readonly relation: MatterRelationEnum, readonly description?: string | null, readonly relatedMatter: SimpleMatterFragment };

export type SimpleMatterRelationSchemaFragment = { readonly id: string, readonly schemaLayout: string, readonly matter: SimpleMatterFragment, readonly relations: ReadonlyArray<SimpleMatterRelationFragment>, readonly relationSchema: { readonly id: string } };

export type SimpleRelationSchemaFragment = { readonly id: string, readonly createdAt: string, readonly updatedAt: string, readonly isPublished: boolean, readonly expiredAt?: string | null, readonly matterRelationSchemas: ReadonlyArray<SimpleMatterRelationSchemaFragment> };

export type SaveAnnotatedLawMutationVariables = Exact<{
  input: AnnotatedArticleInput;
}>;


export type SaveAnnotatedLawMutation = { readonly saveAnnotatedLaw: { readonly id: string, readonly title: string, readonly isPublished: boolean, readonly articles: ReadonlyArray<{ readonly id: string, readonly title?: string | null, readonly text?: string | null, readonly jsonText?: string | null, readonly annotations: ReadonlyArray<{ readonly id: string, readonly text: string, readonly definition?: string | null, readonly comment?: string | null, readonly matter: { readonly id: string }, readonly relationSchema: { readonly id: string } }> }> } };

export type MattersQueryVariables = Exact<{ [key: string]: never; }>;


export type MattersQuery = { readonly matters: ReadonlyArray<MatterFragment> };

export type MatterByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type MatterByIdQuery = { readonly matter: MatterFragment };

export type MatterRelationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type MatterRelationTypesQuery = { readonly matterRelationTypes: ReadonlyArray<{ readonly key: MatterRelationEnum, readonly value: string }> };

export type MatterRelationSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type MatterRelationSchemasQuery = { readonly matterRelationSchemas: ReadonlyArray<SimpleMatterRelationSchemaFragment> };

export type MatterRelationSchemaQueryVariables = Exact<{
  input: MatterRelationSchemaInput;
}>;


export type MatterRelationSchemaQuery = { readonly matterRelationSchema?: SimpleMatterRelationSchemaFragment | null };

export type SaveMatterRelationSchemaMutationVariables = Exact<{
  input: SaveMatterRelationSchemaInput;
}>;


export type SaveMatterRelationSchemaMutation = { readonly saveMatterRelationSchema: SimpleMatterRelationSchemaFragment };

export type RelationSchemasQueryVariables = Exact<{ [key: string]: never; }>;


export type RelationSchemasQuery = { readonly relationSchemas: ReadonlyArray<SimpleRelationSchemaFragment> };

export type RelationSchemaQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RelationSchemaQuery = { readonly relationSchema: SimpleRelationSchemaFragment };

export type PublishRelationSchemaMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type PublishRelationSchemaMutation = { readonly publishRelationSchema: SimpleRelationSchemaFragment };

export const SimpleAnnotationFragmentDoc = gql`
    fragment SimpleAnnotation on Annotation {
  id
  text
}
    `;
export const SimpleArticleFragmentDoc = gql`
    fragment SimpleArticle on Article {
  title
  text
  jsonText
  annotations {
    ...SimpleAnnotation
  }
}
    ${SimpleAnnotationFragmentDoc}`;
export const LawFragmentDoc = gql`
    fragment Law on Law {
  title
  isPublished
  articles {
    ...SimpleArticle
  }
}
    ${SimpleArticleFragmentDoc}`;
export const SimpleLawFragmentDoc = gql`
    fragment SimpleLaw on Law {
  title
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
export const SimpleMatterRelationFragmentDoc = gql`
    fragment SimpleMatterRelation on MatterRelation {
  id
  relatedMatter {
    ...SimpleMatter
  }
  relation
  description
}
    ${SimpleMatterFragmentDoc}`;
export const SimpleMatterRelationSchemaFragmentDoc = gql`
    fragment SimpleMatterRelationSchema on MatterRelationSchema {
  id
  schemaLayout
  matter {
    ...SimpleMatter
  }
  relations {
    ...SimpleMatterRelation
  }
  relationSchema {
    id
  }
}
    ${SimpleMatterFragmentDoc}
${SimpleMatterRelationFragmentDoc}`;
export const SimpleRelationSchemaFragmentDoc = gql`
    fragment SimpleRelationSchema on RelationSchema {
  id
  createdAt
  updatedAt
  isPublished
  expiredAt
  matterRelationSchemas {
    ...SimpleMatterRelationSchema
  }
}
    ${SimpleMatterRelationSchemaFragmentDoc}`;
export const SaveAnnotatedLawDocument = gql`
    mutation saveAnnotatedLaw($input: AnnotatedArticleInput!) {
  saveAnnotatedLaw(input: $input) {
    id
    title
    isPublished
    articles {
      id
      title
      text
      jsonText
      annotations {
        id
        text
        definition
        comment
        matter {
          id
        }
        relationSchema {
          id
        }
      }
    }
  }
}
    `;
export type SaveAnnotatedLawMutationFn = Apollo.MutationFunction<SaveAnnotatedLawMutation, SaveAnnotatedLawMutationVariables>;

/**
 * __useSaveAnnotatedLawMutation__
 *
 * To run a mutation, you first call `useSaveAnnotatedLawMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAnnotatedLawMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAnnotatedLawMutation, { data, loading, error }] = useSaveAnnotatedLawMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAnnotatedLawMutation(baseOptions?: Apollo.MutationHookOptions<SaveAnnotatedLawMutation, SaveAnnotatedLawMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAnnotatedLawMutation, SaveAnnotatedLawMutationVariables>(SaveAnnotatedLawDocument, options);
      }
export type SaveAnnotatedLawMutationHookResult = ReturnType<typeof useSaveAnnotatedLawMutation>;
export type SaveAnnotatedLawMutationResult = Apollo.MutationResult<SaveAnnotatedLawMutation>;
export type SaveAnnotatedLawMutationOptions = Apollo.BaseMutationOptions<SaveAnnotatedLawMutation, SaveAnnotatedLawMutationVariables>;
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
export const MatterRelationTypesDocument = gql`
    query matterRelationTypes {
  matterRelationTypes {
    key
    value
  }
}
    `;

/**
 * __useMatterRelationTypesQuery__
 *
 * To run a query within a React component, call `useMatterRelationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatterRelationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatterRelationTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatterRelationTypesQuery(baseOptions?: Apollo.QueryHookOptions<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>(MatterRelationTypesDocument, options);
      }
export function useMatterRelationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>(MatterRelationTypesDocument, options);
        }
export function useMatterRelationTypesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>(MatterRelationTypesDocument, options);
        }
export type MatterRelationTypesQueryHookResult = ReturnType<typeof useMatterRelationTypesQuery>;
export type MatterRelationTypesLazyQueryHookResult = ReturnType<typeof useMatterRelationTypesLazyQuery>;
export type MatterRelationTypesSuspenseQueryHookResult = ReturnType<typeof useMatterRelationTypesSuspenseQuery>;
export type MatterRelationTypesQueryResult = Apollo.QueryResult<MatterRelationTypesQuery, MatterRelationTypesQueryVariables>;
export const MatterRelationSchemasDocument = gql`
    query matterRelationSchemas {
  matterRelationSchemas {
    ...SimpleMatterRelationSchema
  }
}
    ${SimpleMatterRelationSchemaFragmentDoc}`;

/**
 * __useMatterRelationSchemasQuery__
 *
 * To run a query within a React component, call `useMatterRelationSchemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatterRelationSchemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatterRelationSchemasQuery({
 *   variables: {
 *   },
 * });
 */
export function useMatterRelationSchemasQuery(baseOptions?: Apollo.QueryHookOptions<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>(MatterRelationSchemasDocument, options);
      }
export function useMatterRelationSchemasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>(MatterRelationSchemasDocument, options);
        }
export function useMatterRelationSchemasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>(MatterRelationSchemasDocument, options);
        }
export type MatterRelationSchemasQueryHookResult = ReturnType<typeof useMatterRelationSchemasQuery>;
export type MatterRelationSchemasLazyQueryHookResult = ReturnType<typeof useMatterRelationSchemasLazyQuery>;
export type MatterRelationSchemasSuspenseQueryHookResult = ReturnType<typeof useMatterRelationSchemasSuspenseQuery>;
export type MatterRelationSchemasQueryResult = Apollo.QueryResult<MatterRelationSchemasQuery, MatterRelationSchemasQueryVariables>;
export const MatterRelationSchemaDocument = gql`
    query matterRelationSchema($input: MatterRelationSchemaInput!) {
  matterRelationSchema(input: $input) {
    ...SimpleMatterRelationSchema
  }
}
    ${SimpleMatterRelationSchemaFragmentDoc}`;

/**
 * __useMatterRelationSchemaQuery__
 *
 * To run a query within a React component, call `useMatterRelationSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatterRelationSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatterRelationSchemaQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMatterRelationSchemaQuery(baseOptions: Apollo.QueryHookOptions<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>(MatterRelationSchemaDocument, options);
      }
export function useMatterRelationSchemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>(MatterRelationSchemaDocument, options);
        }
export function useMatterRelationSchemaSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>(MatterRelationSchemaDocument, options);
        }
export type MatterRelationSchemaQueryHookResult = ReturnType<typeof useMatterRelationSchemaQuery>;
export type MatterRelationSchemaLazyQueryHookResult = ReturnType<typeof useMatterRelationSchemaLazyQuery>;
export type MatterRelationSchemaSuspenseQueryHookResult = ReturnType<typeof useMatterRelationSchemaSuspenseQuery>;
export type MatterRelationSchemaQueryResult = Apollo.QueryResult<MatterRelationSchemaQuery, MatterRelationSchemaQueryVariables>;
export const SaveMatterRelationSchemaDocument = gql`
    mutation saveMatterRelationSchema($input: SaveMatterRelationSchemaInput!) {
  saveMatterRelationSchema(input: $input) {
    ...SimpleMatterRelationSchema
  }
}
    ${SimpleMatterRelationSchemaFragmentDoc}`;
export type SaveMatterRelationSchemaMutationFn = Apollo.MutationFunction<SaveMatterRelationSchemaMutation, SaveMatterRelationSchemaMutationVariables>;

/**
 * __useSaveMatterRelationSchemaMutation__
 *
 * To run a mutation, you first call `useSaveMatterRelationSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMatterRelationSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMatterRelationSchemaMutation, { data, loading, error }] = useSaveMatterRelationSchemaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveMatterRelationSchemaMutation(baseOptions?: Apollo.MutationHookOptions<SaveMatterRelationSchemaMutation, SaveMatterRelationSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMatterRelationSchemaMutation, SaveMatterRelationSchemaMutationVariables>(SaveMatterRelationSchemaDocument, options);
      }
export type SaveMatterRelationSchemaMutationHookResult = ReturnType<typeof useSaveMatterRelationSchemaMutation>;
export type SaveMatterRelationSchemaMutationResult = Apollo.MutationResult<SaveMatterRelationSchemaMutation>;
export type SaveMatterRelationSchemaMutationOptions = Apollo.BaseMutationOptions<SaveMatterRelationSchemaMutation, SaveMatterRelationSchemaMutationVariables>;
export const RelationSchemasDocument = gql`
    query relationSchemas {
  relationSchemas {
    ...SimpleRelationSchema
  }
}
    ${SimpleRelationSchemaFragmentDoc}`;

/**
 * __useRelationSchemasQuery__
 *
 * To run a query within a React component, call `useRelationSchemasQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelationSchemasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelationSchemasQuery({
 *   variables: {
 *   },
 * });
 */
export function useRelationSchemasQuery(baseOptions?: Apollo.QueryHookOptions<RelationSchemasQuery, RelationSchemasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RelationSchemasQuery, RelationSchemasQueryVariables>(RelationSchemasDocument, options);
      }
export function useRelationSchemasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RelationSchemasQuery, RelationSchemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RelationSchemasQuery, RelationSchemasQueryVariables>(RelationSchemasDocument, options);
        }
export function useRelationSchemasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RelationSchemasQuery, RelationSchemasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RelationSchemasQuery, RelationSchemasQueryVariables>(RelationSchemasDocument, options);
        }
export type RelationSchemasQueryHookResult = ReturnType<typeof useRelationSchemasQuery>;
export type RelationSchemasLazyQueryHookResult = ReturnType<typeof useRelationSchemasLazyQuery>;
export type RelationSchemasSuspenseQueryHookResult = ReturnType<typeof useRelationSchemasSuspenseQuery>;
export type RelationSchemasQueryResult = Apollo.QueryResult<RelationSchemasQuery, RelationSchemasQueryVariables>;
export const RelationSchemaDocument = gql`
    query relationSchema($id: UUID!) {
  relationSchema(id: $id) {
    ...SimpleRelationSchema
  }
}
    ${SimpleRelationSchemaFragmentDoc}`;

/**
 * __useRelationSchemaQuery__
 *
 * To run a query within a React component, call `useRelationSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useRelationSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRelationSchemaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRelationSchemaQuery(baseOptions: Apollo.QueryHookOptions<RelationSchemaQuery, RelationSchemaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RelationSchemaQuery, RelationSchemaQueryVariables>(RelationSchemaDocument, options);
      }
export function useRelationSchemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RelationSchemaQuery, RelationSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RelationSchemaQuery, RelationSchemaQueryVariables>(RelationSchemaDocument, options);
        }
export function useRelationSchemaSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RelationSchemaQuery, RelationSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RelationSchemaQuery, RelationSchemaQueryVariables>(RelationSchemaDocument, options);
        }
export type RelationSchemaQueryHookResult = ReturnType<typeof useRelationSchemaQuery>;
export type RelationSchemaLazyQueryHookResult = ReturnType<typeof useRelationSchemaLazyQuery>;
export type RelationSchemaSuspenseQueryHookResult = ReturnType<typeof useRelationSchemaSuspenseQuery>;
export type RelationSchemaQueryResult = Apollo.QueryResult<RelationSchemaQuery, RelationSchemaQueryVariables>;
export const PublishRelationSchemaDocument = gql`
    mutation publishRelationSchema($id: UUID!) {
  publishRelationSchema(id: $id) {
    ...SimpleRelationSchema
  }
}
    ${SimpleRelationSchemaFragmentDoc}`;
export type PublishRelationSchemaMutationFn = Apollo.MutationFunction<PublishRelationSchemaMutation, PublishRelationSchemaMutationVariables>;

/**
 * __usePublishRelationSchemaMutation__
 *
 * To run a mutation, you first call `usePublishRelationSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishRelationSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishRelationSchemaMutation, { data, loading, error }] = usePublishRelationSchemaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishRelationSchemaMutation(baseOptions?: Apollo.MutationHookOptions<PublishRelationSchemaMutation, PublishRelationSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishRelationSchemaMutation, PublishRelationSchemaMutationVariables>(PublishRelationSchemaDocument, options);
      }
export type PublishRelationSchemaMutationHookResult = ReturnType<typeof usePublishRelationSchemaMutation>;
export type PublishRelationSchemaMutationResult = Apollo.MutationResult<PublishRelationSchemaMutation>;
export type PublishRelationSchemaMutationOptions = Apollo.BaseMutationOptions<PublishRelationSchemaMutation, PublishRelationSchemaMutationVariables>;