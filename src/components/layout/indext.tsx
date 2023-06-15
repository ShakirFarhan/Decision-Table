import React, { ReactNode, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  AiOutlineAppstore,
  AiOutlineFolder,
  AiOutlineMenu,
} from 'react-icons/ai';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { BsBox } from 'react-icons/bs';
import { RxCountdownTimer } from 'react-icons/rx';
import { ImStatsDots } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';
import Edit from '../../assets/Edit.svg';
import { LuUndo, LuRedo } from 'react-icons/lu';
import { BsZoomIn, BsZoomOut, BsSearch, BsDownload } from 'react-icons/bs';
import { CiExport } from 'react-icons/ci';
const { Header, Sider, Content } = Layout;

type CardProps = {
  children: ReactNode;
  downloadCSV: () => void;
  downloadExcel: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
};
const DashBoardLayout: React.FC<CardProps> = ({
  children,
  downloadCSV,
  downloadExcel,
  handleUndo,
  handleRedo,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="bg-white">
      <Sider
        className="border-b-[1px] border-[#000000]"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="bg-white p-7 cursor-pointer">
          <AiOutlineMenu size={22} onClick={() => setCollapsed(!collapsed)} />
        </div>
        <Menu
          className="h-full"
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ImStatsDots size={22} />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <AiOutlineFolder size={22} />,
              label: 'Folder',
            },
            {
              key: '3',
              icon: <AiOutlineAppstore size={22} />,
              label: 'Store',
            },
            {
              key: '4',
              icon: <RiCheckboxMultipleBlankLine size={22} />,
              label: 'Checkbox',
            },
            {
              key: '5',
              icon: <BsBox size={22} />,
              label: 'Double Box',
            },
            {
              key: '6',
              icon: <RxCountdownTimer size={22} />,
              label: 'TImer',
            },
            {
              key: '1',
              icon: <BsBox size={22} />,
              label: 'Box',
            },
          ]}
        />
      </Sider>
      <Layout className="h-[100vh]">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <nav className="bg-white">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-black font-bold">
                  Home
                </a>
                <a href="#" className="text-black">
                  File
                </a>
                <a href="#" className="text-black">
                  Edit
                </a>
                <a href="#" className="text-black">
                  Library
                </a>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-50 h-8 rounded-md w-64 px-4"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </nav>
        </Header>
        <Content
          style={{
            minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          <div className="w-[100%] h-[50px] bg-[#fff] border-t-[1px] flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <BsArrowLeft className="w-[20px] h-[20px] text-[#595959]" />
              <div className="flex items-center gap-x-1">
                <h5 className="text-[17px] font-medium text-[#262626]">
                  DecisionTableA
                </h5>

                <img className="w-[18px] h-[18px] bg-transparent" src={Edit} />
              </div>
            </div>
            <div className="flex items-center gap-x-8 mr-3">
              <BsSearch className="w-[18px] h-[18px] text-[#595959] hover:cursor-pointer" />
              <button
                onClick={() => handleUndo()}
                className="hover:cursor-pointer"
                id="undoBtn"
              >
                <LuUndo className="w-[18px] h-[18px] text-[#595959]" />
              </button>
              <button
                onClick={() => handleRedo()}
                className="hover:cursor-pointer"
                id="redoBtn"
              >
                <LuRedo className="w-[18px] h-[18px] text-[#595959]" />
              </button>
              <BsZoomIn className="w-[18px] h-[18px] text-[#595959] hover:cursor-pointer" />
              <BsZoomOut className="w-[18px] h-[18px] text-[#595959] hover:cursor-pointer" />
              {/* <BsDownload className="w-[18px] h-[21px] text-[#595959] hover:cursor-pointer" />
              <CiExport className="w-[21px] h-[21px] text-[#595959] hover:cursor-pointer" /> */}
              <button onClick={() => downloadCSV()}>CSV</button>
              <button onClick={() => downloadExcel()}>Excel</button>
            </div>
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
