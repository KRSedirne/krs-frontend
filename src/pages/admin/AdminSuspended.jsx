import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { adminDeleteSuspended, adminGetAllSuspendeds } from '../../api/admin/adminSuspended';
import { Button } from '@mui/material'; // Butonları kullanmak için MUI'dan import ediyoruz

const columns = [
    { width: 70, label: 'Name', dataKey: 'name' },
    { width: 70, label: 'Last Name', dataKey: 'lastname' },
    { width: 70, label: 'Type', dataKey: 'type' },
    { width: 100, label: 'Description', dataKey: 'description' },
    { width: 100, label: 'Expire Time ', dataKey: 'expireTime' },
    { width: 50, dataKey: 'delete' },
];

const AdminSuspended = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await adminGetAllSuspendeds();
            setData(response.response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (id) => {
        const deleteSuspended = async (id) => {
            try {
                const response = await adminDeleteSuspended(id);
                console.log(response);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        };
        deleteSuspended(id);
        console.log(`Delete clicked for ID: ${id}`);
    };

    useEffect(() => {
        fetchData();
    }, []); // data yazarsan sonsuz döngüye girer

    
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
                    style={{ width: column.width, fontWeight: 'bold' }}
                    sx={{ backgroundColor: 'background.paper' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );

    const RowContent = (_index, row) => (
        <>
            {columns.map((column) => {
                if (column.dataKey === 'delete') {
                    return (
                        <TableCell key={column.dataKey} align="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(row.id)} // Burada delete işlemi başlatılıyor
                            >
                                Delete
                            </Button>
                        </TableCell>
                    );
                }
                return (
                    <TableCell key={column.dataKey} align={column.numeric ? 'right' : 'left'}>
                        {row[column.dataKey]}
                    </TableCell>
                );
            })}
        </>
    );

    return (
        <Paper style={{ height: '95vh', width: '100%' }}>
            <TableVirtuoso
                data={data ? data : []}
                components={VirtuosoTableComponents}
                fixedHeaderContent={FixedHeaderContent}
                itemContent={RowContent}
            />
        </Paper>
    );
};

export default AdminSuspended;