import React from 'react';
import ReactDOM from 'react-dom';
import RelationSchemaIndex from './RelationSchemaIndex';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelationSchemaIndex />, div);
  ReactDOM.unmountComponentAtNode(div);
});