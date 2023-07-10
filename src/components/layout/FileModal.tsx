import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Papa from 'papaparse';
import { useStore } from '../../store';
const FileModal: React.FC = () => {
  const { addCsvImportColumns } = useStore((store) => store);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnHeaders, setColumnHeaders] = useState<any[]>([]);
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
  };
  const handleFile = (e: any) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        let columnHeaders: any = [];
        let columnValues: any = [];
        results.data.map((data: any) => {
          columnHeaders.push(Object.keys(data));  
          columnValues.push(Object.values(data));
          return null;
        });

        setColumnHeaders(columnHeaders[0]);
        setColumnRows(columnValues);
        // setNewColumns([...newColumns, ...results.data]);
      },
    });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Import CSV
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <input onChange={handleFile} type="file" accept=".csv" name="file" />
        </div>
      </Modal>
    </>
  );
};

export default FileModal;
