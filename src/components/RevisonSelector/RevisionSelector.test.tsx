import React from 'react';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import RevisionSelector from './RevisionSelector';
import EditArticle from "../EditArticle/EditArticle";

// Mocking the EditArticle component
jest.mock('../EditArticle/EditArticle', () => ({
    __esModule: true,
    default: jest.fn(() => null)
}));

// Mocking the useParams and useQuery hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useQuery: jest.fn(),
}));

describe('RevisionSelector Component', () => {

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    test('renders RevisionSelector with tabs and EditArticle', async () => {

        // Mock the useParams hook
        (useParams as jest.Mock).mockReturnValue({id: 'some-law-id'});

        // Mock the useQuery hook
        (useQuery as jest.Mock).mockReturnValue({
            data: {
                lawRevisions: {
                    law: {
                        revision: 1,
                    },
                    revisions: [
                        {revision: 0, createdAt: '2022-01-19T12:00:00Z'},
                        {revision: 1, createdAt: '2022-01-20T12:00:00Z'},
                        {revision: 2, createdAt: '2022-01-21T12:00:00Z'},
                        {revision: 3, createdAt: '2022-01-22T12:00:00Z'},
                    ],
                },
            },
            loading: false,
            error: null,
            refetch: jest.fn(),
        });

        render(<RevisionSelector/>);

        // Assert the tabs are rendered
        expect(screen.getByText('1/19/2022, 1:00:00 PM')).toBeInTheDocument();
        expect(screen.getByText('1/20/2022, 1:00:00 PM')).toBeInTheDocument();
        expect(screen.getByText('1/21/2022, 1:00:00 PM')).toBeInTheDocument();
        expect(screen.getByText('1/22/2022, 1:00:00 PM')).toBeInTheDocument();

        // Ensure EditArticle is called once with the default value and once with the most recent article
        expect(EditArticle).toHaveBeenCalledTimes(2);

        // Ensure EditArticle is called with the correct properties
        const calls = (EditArticle as jest.Mock).mock.calls;

        // Arrange the first call
        const firstCall = calls[0];
        // Assertion about the first call
        expect(firstCall[0].revision).toBe(0);
        expect(typeof firstCall[0].stateChanger).toBe('function');
        expect(typeof firstCall[0]).toBe('object');

        // Arrange the second call
        const secondCall = calls[1];
        // Assertion about the second call
        expect(secondCall[0].revision).toBe(1);
        expect(typeof secondCall[0].stateChanger).toBe('function');
        expect(typeof secondCall[0]).toBe('object');

        // Arrange click on the second tab
        act(() => {
            userEvent.click(screen.getByText('1/22/2022, 1:00:00 PM'));
        })

        // Assert EditArticle is called again after selecting revision
        expect(EditArticle).toHaveBeenCalledTimes(3);

        // Arrange the third call
        const thirdCall = calls[2];
        // Assertion about the third call
        expect(thirdCall[0].revision).toBe(3);
        expect(typeof thirdCall[0].stateChanger).toBe('function');
        expect(typeof thirdCall[0]).toBe('object');

        // Arrange a state change to trigger refetch
        act(() => {
            const stateChanger = (EditArticle as jest.Mock).mock.calls[0][0].stateChanger;
            stateChanger(true);
        });

        // Assert lawRefetch is called with the correct variables
        expect((useQuery as jest.Mock).mock.results[0].value.refetch).toHaveBeenCalledWith({
            variables: {id: 'some-law-id'},
        });
    });
});
