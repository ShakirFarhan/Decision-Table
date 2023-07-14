import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useStore } from '../../store';
import { Column } from '../../constants/interfaces';
import { convertFile } from '../../utils';

const FileModal: React.FC = () => {
  const { addCsvImportColumns } = useStore((store) => store);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState<Column[]>([]);
  const [columnsRows, setColumnRows] = useState<any[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    addCsvImportColumns(columnHeaders, columnsRows);
    setIsModalOpen(false);
    setColumnHeaders([]);
  };
  const handleFile = (e: any) => {
    convertFile(e.target.files[0], setColumnHeaders);
  };

  console.log(columnHeaders);
  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-[#1677ff]">
        Import CSV
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <input
            onChange={handleFile}
            type="file"
            accept=".xlsx, .xls, .csv"
            name="file"
          />
        </div>
      </Modal>
    </>
  );
};

export default FileModal;
