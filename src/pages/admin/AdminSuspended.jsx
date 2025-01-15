import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';

const chance = new Chance(42);

const columns = [
    { width: 100, label: 'ID', dataKey: 'id', numeric: true },
    { width: 100, label: 'First Name', dataKey: 'firstName' },
    { width: 100, label: 'Last Name', dataKey: 'lastName' },
    { width: 100, label: 'Type', dataKey: 'type'},
    { width: 100, label: 'Description', dataKey: 'description' },
    { width: 100, label: 'Expire Time ', dataKey: 'expireTime' },
    { width: 100, label: 'Update', dataKey: 'update' },
    { width: 100, label: 'Delete', dataKey: 'delete' },
];

function createData(id) {
  return {
    id,
    firstName: chance.first(),
    lastName: chance.last(),
    type: chance.sentence({ words: 1 }),
    description: chance.sentence({ words: 10 }),
    expireTime: chance.date({ string: true }),
  };
}

const rows = Array.from({ length: 200 }, (_, index) => createData(index));

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

const FixedHeaderContent = () => (
  <TableRow>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        variant="head"
        align={column.numeric ? 'right' : 'left'}
        style={{ width: column.width }}
        sx={{ backgroundColor: 'background.paper' }}
      >
        {column.label}
      </TableCell>
    ))}
  </TableRow>
);

const RowContent = (_index, row) => (
  <>
    {columns.map((column) => (
      <TableCell key={column.dataKey} align={column.numeric ? 'right' : 'left'}>
        {row[column.dataKey]}
      </TableCell>
    ))}
  </>
);

const AdminSuspended = () => {

    return(
        <Paper style={{ height: '95vh', width: '100%' }}>
            <TableVirtuoso
                data={rows}
                components={VirtuosoTableComponents}
                fixedHeaderContent={FixedHeaderContent}
                itemContent={RowContent}
            />
        </Paper>
    )
};

export default AdminSuspended;
