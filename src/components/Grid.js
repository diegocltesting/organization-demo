import React, { useEffect, useState } from 'react';
import { Table, Button, Radio, Input, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { PlusCircleTwoTone } from "@ant-design/icons";
import { apiUrl } from '../App';

const { Search } = Input;

function Grid() {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const loadDivisions = async () => {
      const response = await fetch(apiUrl, {
        method: 'GET'
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        const _divisions = json.map((division) => {
          // Some fixes for Table component
          division.key = `${division.id}-${division.name}`;

          const parentDivision = json.find((d) => division.parent_id === d.id);
          if (parentDivision) {
            division.parentDivision = parentDivision.name;
          } else {
            division.parentDivision = '-';
          }

          const numChildren = json.filter((d) => division.id === d.parent_id).length;
          division.subDivisions = numChildren;

          if (division.ambassador === '') {
            division.ambassador = '-';
          }

          return division;
        });
        setDivisions(_divisions);
      }
    };
    loadDivisions();
  }, []);

  const columns = [
    {
      title: () => <b>División</b>,
      dataIndex: 'name',
      width: '20%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      filters: [...new Set(divisions.map(d => d.name))].map(d => ({ text: d, value: d })),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: <b>División Superior</b>,
      dataIndex: 'parentDivision',
      width: '15%',
      sorter: (a, b) => a.parentDivision.localeCompare(b.parentDivision),
      sortDirections: ['ascend', 'descend'],
      filters: [...new Set(divisions.map(d => d.parentDivision))].map(d => ({ text: d, value: d })),
      onFilter: (value, record) => record.parentDivision.indexOf(value) === 0
    },
    {
      title: <b>Colaboradores</b>,
      dataIndex: 'collaborators',
      width: '15%',
      sorter: (a, b) => a.collaborators - b.collaborators,
      sortDirections: ['ascend', 'descend']
    },
    {
      title: <b>Nivel</b>,
      dataIndex: 'level',
      width: '15%',
      sorter: (a, b) => a.level - b.level,
      sortDirections: ['ascend', 'descend'],
      filters: [...new Set(divisions.map(d => d.level))].map(d => ({ text: d, value: d })),
      onFilter: (value, record) => record.level === (value)
    },
    {
      title: <b>Subdivisiones</b>,
      dataIndex: 'subDivisions',
      width: '15%',
      sorter: (a, b) => a.subDivisions - b.subDivisions,
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => (
        <>
          <Text underline>{record.subDivisions}</Text>
          <Button shape='circle' className='btn-transparent' icon={<PlusCircleTwoTone />} />
        </>)
    },
    {
      title: <b>Embajadores</b>,
      dataIndex: 'ambassador',
      width: '15%',
      sorter: (a, b) => a.ambassador.localeCompare(b.ambassador),
      sortDirections: ['ascend', 'descend']
    }
  ];

  return (
    <div className='grid-background-color grid-padding'>
      <div className='use-flex margin-radio-group'>
        <Radio.Group className='margin-right-auto' defaultValue='list'>
          <Radio.Button value="list">Listado</Radio.Button>
          <Radio.Button value="tree">Árbol</Radio.Button>
        </Radio.Group>
        <Select className='margin-right select' placeholder="Columnas">
        </Select>
        <Search placeholder='Buscar' className='search' />
      </div>
      <Table
        columns={columns}
        dataSource={divisions}
        bordered
        rowSelection={{ type: 'checkbox' }}
        pagination={{
          showTotal: (total) => <span className='pagination-text-left'>Total colaboradores: {total}</span>,
          locale: (items_per_page) => `${items_per_page}: / página`
        }} />
    </div>
  );
}

export default Grid;
