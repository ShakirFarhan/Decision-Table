import React, { FormEvent, useState } from 'react';
import Popover from '@mui/material/Popover';
import editIcon from '../../assets/Edit.svg';
import '../css/customCell.css';
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { useStore } from '../../store';
import { cellOptions } from '../../constants/data';

interface IProps {
  onEdit: (params: any) => void;
  cellValue?: any;
  id?: any;
  column?: any;
  node?: any;
  value?: any;
}

const CustomCell: React.FC<IProps> = (props) => {
  const { editRowData } = useStore((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editingValue, setEditingValue] = useState(
    props && props.cellValue && props.cellValue.value
  );
  const [selectedOption, setSelectedOption] = useState(
    props && props.cellValue && props.cellValue.type
  );
  const [hovering, setHovering] = useState(false);
  const handleEdit = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (data: any) => {
    const cellValueNew = {
      type: selectedOption,
      value: editingValue,
    };
    editRowData(props.node.rowIndex, props.column.colId, cellValueNew);
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cellValueNew = {
      type: selectedOption,
      value: editingValue,
    };
    editRowData(props.node.rowIndex, props.column.colId, cellValueNew);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
        <div className="rounded-0 bg-[#f5f5f5] text-[#595959] font-semibold tracking-[1px] text-[11px] h-[27px] px-2 flex items-center cellType">
          {props && props.cellValue && <span>{props.cellValue.type}</span>}
        </div>
        <span>{props && props.cellValue && props.cellValue.value}</span>
        <button className="absolute right-4" onClick={handleEdit}>
          {hovering && (
            <img src={editIcon} className="w-[18px] h-[18px]" alt="" />
          )}
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
        style={{ position: 'absolute', left: '-125px', top: '15px' }}
      >
        <div style={{ padding: '15px', paddingTop: '20px' }}>
          <form onSubmit={handleSubmit}>
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
            <Button type="submit"></Button>
          </form>
        </div>
      </Popover>
    </div>
  );
};

export default CustomCell;
