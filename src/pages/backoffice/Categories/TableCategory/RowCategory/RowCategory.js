import React from 'react';
import s from './RowCategory.module.css';

const RowCategory = ({ category, onEdit, onDelete }) => (
  <tr>
    <th>{category.id}</th>
    <th>{category.name}</th>
    <th className={s.description}>{category.description}</th>
    <th>
      <button className={s.button_edit} onClick={() => onEdit(category.id)}>
        <div className={s.container_edit}>
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </div>
      </button>
      <button className={s.button_delete} onClick={() => onDelete(category.id)}>
        <div className={s.container_delete}>
          <i class="fa fa-trash" aria-hidden="true"></i>
        </div>
      </button>
    </th>
  </tr>
);

export default RowCategory;
