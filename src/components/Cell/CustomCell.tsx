import React, { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Popover from '@mui/material/Popover';
import { TextField, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import { options } from './celloptions';
import { useStore } from '../../store';

interface IProps {
  onEdit: (params: any) => void;
  cellValue?: string;
  id?: any;
  column?: any;
  node?: any;
}

const CustomCell: React.FC<IProps> = (props) => {

  const {
    whenRowData,
    editRowData,
  } = useStore((store) => store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [editingValue, setEditingValue] = useState(props.cellValue);

  const handleEdit = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data: any) => {
    editRowData(props.node.rowIndex, props.column.colId, editingValue);
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleChangeOption = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-edit-cell' : undefined;

  return (
    <div style={{ position: 'relative' }}>
      <div className="flex items-center justify-between h-[40px] select-none"
      >
        <span>{props.cellValue}</span>
        <button onClick={handleEdit}>
          <MdOutlineModeEditOutline className="w-[18px] h-[18px]" />
        </button>

      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{position:"absolute", left:"-125px", top:"15px"}}
      >
        <div style={{ padding: '15px', paddingTop: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              value={selectedOption}
              onChange={handleChangeOption}
            >
              {options && options.map((item: any, index: any) => {
                return <MenuItem value={item.id} key={index}>{item.value}</MenuItem>
              }) }
            </Select>
          </FormControl>

          <Box marginTop="1rem"></Box>
          <TextField
            value={editingValue}
            onChange={handleChange}
            fullWidth
          />
        
        </div>
      </Popover>
    </div>
  );
};

export default CustomCell;
