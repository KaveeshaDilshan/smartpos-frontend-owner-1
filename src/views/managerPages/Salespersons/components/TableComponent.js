/* eslint-disable */
import React, { useMemo } from 'react';
import { useTable, useFlexLayout, useGlobalFilter } from 'react-table';
import MOCK_DATA from './MOCK_DATA';
import COLUMNS from './columns';
import './TableComponent.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const TableComponent = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout,
    useGlobalFilter
  );
  const filter = useSelector(
    (state) => state.salespersonsReducer.salespersonsFilter
  );
  useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  return (
    <>
      <div {...getTableProps()} className="table" style={{ height: 500 }}>
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
