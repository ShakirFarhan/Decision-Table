import React, { ReactNode, useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
  AiOutlineAppstore,
  AiOutlineFolder,
  AiOutlineMenu,
  AiOutlineEdit,
} from 'react-icons/ai';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { BsBox } from 'react-icons/bs';
import { RxCountdownTimer } from 'react-icons/rx';
import { ImStatsDots } from 'react-icons/im';
import { BsArrowLeft } from 'react-icons/bs';
import { LuUndo, LuRedo } from 'react-icons/lu';
import { BsZoomIn, BsZoomOut, BsSearch, BsSun } from 'react-icons/bs';
import { TbMoonStars } from 'react-icons/tb';
import { useStore } from '../../store';
import FileModal from './FileModal';
const { Header, Sider, Content } = Layout;
type CardProps = {
  children: ReactNode;
  downloadCSV: () => void;
  downloadExcel: () => void;
};

const DashBoardLayout: React.FC<CardProps> = ({
  children,
  downloadCSV,
  downloadExcel,
}) => {
  const { mode, setMode, undo, redo, past, future } = useStore(
    (store) => store
  );
  const [collapsed, setCollapsed] = useState(true);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const handleUndo = () => {
    if (past.length >= 1) {
      undo();
    }
    return;
  };
  const handleRedo = () => {
    if (future.length >= 1) {
      redo();
    }
    return;
  };
  const moonIcon = <TbMoonStars size={22} className="text-black" />;
  const sunIcon = <BsSun size={22} className="text-white" />;

  return (
    <Layout className="bg-[var(--secondary-bg)]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="bg-[var(--secondary-bg)] text-[var(--black-shade)] px-7 py-[20.6px] border-b-[1px] border-[var(--primary-border)] cursor-pointer">
          <AiOutlineMenu size={22} onClick={() => setCollapsed(!collapsed)} />
        </div>
        <Menu
          className="h-full bg-[var(--secondary-bg)] text-[var(--black-shade)] pt-1"
          style={{ borderRight: '1.5px solid var(--primary-border)' }}
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
              key: '7',
              icon: <BsBox size={22} />,
              label: 'Box',
            },
          ]}
        />
      </Sider>
      <Layout className="h-[100vh]">
        <Header className="px-2 bg-[var(--secondary-bg)] border-b-[1px] border-[var(--primary-border)]">
          <nav className="">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-[var(--primary-color)] font-bold">
                  Home
                </a>
                <a href="/file" className="text-[var(--primary-color)]">
                  File
                </a>
                <a href="/edit" className="text-[var(--primary-color)]">
                  Edit
                </a>
                <a href="/library" className="text-[var(--primary-color)]">
                  Library
                </a>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    boxShadow:
                      'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
                  }}
                  className="bg-[var(--primary-bg)] h-8 rounded-md w-64 px-4 focus:outline-none focus:border-none text-[var(--foreground-color)] border-[0.6px] border-[var(--primary-border)]"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  type="text"
                  icon={mode === 'light' ? moonIcon : sunIcon}
                  onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                ></Button>
                <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </nav>
        </Header>
        <Content
          style={{
            minHeight: 280,
          }}
        >
          <div className="w-[100%] h-[50px] bg-[var(--secondary-bg)] bvar(--primary-color)order-t-[1px] flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <BsArrowLeft className="w-[20px] h-[20px] text-[var(--primary-color)]" />
              <div className="flex items-center gap-x-1">
                <h5 className="text-[17px] font-medium text-[var(--black-shade)]">
                  DecisionTableA
                </h5>

                <AiOutlineEdit className="w-[20px] h-[20px] text-[var(--primary-color)]" />
              </div>
            </div>
            <div className="flex items-center gap-x-8 mr-3">
              <BsSearch className="w-[18px] h-[18px] text-[var(--primary-color)] hover:cursor-pointer" />
              <button
                onClick={handleUndo}
                className="hover:cursor-pointer"
                id="undoBtn"
              >
                <LuUndo
                  className={`w-[18px] h-[18px] ${
                    past.length >= 1
                      ? 'text-[var(--primary-color)]'
                      : 'text-[#808080]'
                  }`}
                />
              </button>
              <button
                onClick={handleRedo}
                className="hover:cursor-pointer"
                id="redoBtn"
              >
                <LuRedo
                  className={`w-[18px] h-[18px] ${
                    future.length >= 1
                      ? 'text-[var(--primary-color)]'
                      : 'text-[#808080]'
                  }`}
                />
              </button>
              <BsZoomIn className="w-[18px] h-[18px] text-[var(--primary-color)] hover:cursor-pointer" />
              <BsZoomOut className="w-[18px] h-[18px] text-[var(--primary-color)] hover:cursor-pointer" />
              {/* <BsDownload className="w-[18px] h-[21px] text-[var(--primary-color)] hover:cursor-pointer" />
              <CiExport className="w-[21px] h-[21px] text-[var(--primary-color)] hover:cursor-pointer" /> */}
              <FileModal />
              <button
                className="text-[var(--primary-color)]"
                onClick={() => downloadCSV()}
              >
                Export CSV
              </button>
              <button
                className="text-[var(--primary-color)]"
                onClick={() => downloadExcel()}
              >
                Excel
              </button>
            </div>
          </div>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
