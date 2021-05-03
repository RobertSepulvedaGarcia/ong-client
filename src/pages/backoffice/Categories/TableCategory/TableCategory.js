import React from 'react';
import s from './TableCategory.module.css';
import RowCategory from './RowCategory/RowCategory'
import Loader from '../../../../components/Loader/index';

export default function TableCategory({categories, onEdit, onDelete}){
    return (
        <div className={s.container_table_category}>
            <table className={s.table}>
                <thead className={s.container_thead}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th className={s.description}>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories !== [] ?(
                        categories.map(category => 
                            <RowCategory
                                key={category.id}
                                category={category}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        )) : (
                            <div>
                                <Loader />
                            </div>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
