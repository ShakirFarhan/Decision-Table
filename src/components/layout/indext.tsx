import React, { ReactNode, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineAppstore, AiOutlineFolder, AiOutlineMenu } from 'react-icons/ai';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'
import { BsBox } from 'react-icons/bs'
import { RxCountdownTimer } from 'react-icons/rx'
import { ImStatsDots } from 'react-icons/im'

const { Header, Sider, Content } = Layout;


type CardProps = {
    children: ReactNode;
};

const DashBoardLayout: React.FC<CardProps> = ({children}) => {
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='bg-white'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='bg-white p-7 cursor-pointer'>
                    <AiOutlineMenu size={22} onClick={() => setCollapsed(!collapsed)} />
                </div>
                <Menu
                    className='h-[100vh]'
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
                            icon: <RxCountdownTimer size={22}/>,
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
                                <a href="#" className="text-black font-bold">Home</a>
                                <a href="#" className="text-black">File</a>
                                <a href="#" className="text-black">Edit</a>
                                <a href="#" className="text-black">Library</a>
                            </div>

                            <div className="flex items-center justify-center">
                                <input type="text" placeholder="Search" className="bg-gray-50 h-8 rounded-md w-64 px-4"/>
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
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoardLayout;