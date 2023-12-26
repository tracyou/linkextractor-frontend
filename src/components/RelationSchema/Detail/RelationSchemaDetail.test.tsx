import React from 'react';
import ReactDOM from 'react-dom';
import RelationSchemaDetail from './RelationSchemaDetail';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelationSchemaDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});