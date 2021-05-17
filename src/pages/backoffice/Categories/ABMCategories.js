import React, { useState, useEffect } from 'react';
import { getHttpRequest } from '../../../helper/axios/index';
import TableCategory from './TableCategory/TableCategory';
import CreateCategory from './CreateCategory/CreateCategory';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import UpdateCategory from './UpdateCategory/UpdateCategory';

import s from './ABMCategories.module.css';
const Categories = () => {
  const [state, setState] = useState({
    action: null,
    category: [],
    categories: [],
  });

  useEffect(() => {
    getHttpRequest('/categories')
      .then(({ data }) => {
        setState({
          ...state,
          categories: data,
        });
      })
      .catch(err => console.error(err));
  }, []);

  const onUpdate = id => {
    window.scroll(0, 0);
    setState({
      ...state,
      action: 'update',
      category: state.categories.find(category => category.id === id),
    });
  };
  const handleUpdate = (id, category) => {
    setState({ ...state, action: null });
  };

  const onDelete = id => {
    window.scroll(0, 0);
    setState({
      ...state,
      action: 'delete',
      category: state.categories.find(category => category.id === id),
    });
  };
  const handleDelete = id => {
    setState({ ...state, action: null });
  };

  const onNotSure = e => {
    setState({ ...state, action: null });
  };
  return (
    <div>
      <div className={s.form}>
        <h4>Categories</h4>
        {state.action === null && <CreateCategory />}
        {state.action === 'update' && (
          <UpdateCategory
            handleUpdate={handleUpdate}
            category={state.category}
          />
        )}
        {state.action === 'delete' && (
          <DeleteCategory
            handleDelete={handleDelete}
            category={state.category}
            onNotSure={onNotSure}
          />
        )}
        <TableCategory
          categories={state.categories}
          onEdit={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default Categories;
