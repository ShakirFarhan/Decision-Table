import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import EditIcon from '../../assets/Edit.svg';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import { cellOptions } from '../../constants/data';
import '../css/table.css';
interface IProps {
  onEdit: (params: any) => void;
  cellValue?: string;
  id?: any;
}

const CustomCell: React.FC<IProps> = ({ onEdit, cellValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingValue, setEditingValue] = useState(cellValue);
  const [hovering, setHovering] = useState(false);

  const handleEdit = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data: any) => {
    console.log(data);
    cellValue = editingValue;
    onEdit(data);
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleChangeOption = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'popover-edit-cell' : undefined;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <div className="flex items-center justify-between h-[40px] select-none">
        <span>{cellValue}</span>
        {hovering && (
          <button onClick={handleEdit}>
            <img className="w-[18px] h-[18px] mr-4" src={EditIcon} />
          </button>
        )}
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
        style={{ position: 'absolute', left: '-125px', top: '15px' }}
      >
        <div style={{ padding: '15px', paddingTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              value={selectedOption}
              onChange={handleChangeOption}
            >
              {cellOptions &&
                cellOptions.map((item: any, index: any) => {
                  return (
                    <MenuItem value={item.id} key={index}>
                      {item.value}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <Box marginTop="1rem"></Box>
          <TextField value={editingValue} onChange={handleChange} fullWidth />
        </div>
      </Popover>
    </div>
  );
};

export default CustomCell;
