import React, { ReactNode, useState } from 'react';
import { Layout, Menu, theme, Switch, Button } from 'antd';
import { AiOutlineAppstore, AiOutlineFolder, AiOutlineMenu } from 'react-icons/ai';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri'
import { BsBox, BsSun } from 'react-icons/bs'
import { RxCountdownTimer } from 'react-icons/rx'
import { ImStatsDots } from 'react-icons/im'
import { TbMoonStars } from 'react-icons/tb';

const { Header, Sider, Content } = Layout;


type CardProps = {
    children: ReactNode;
};

const DashBoardLayout: React.FC<CardProps> = ({children}) => {
    const [collapsed, setCollapsed] = useState(true);
    const [mode, setMode] = useState('light');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const moonIcon = <TbMoonStars size={22} className={mode ==='light' ? 'text-black': 'text-white'} />;
    const sunIcon = <BsSun size={22} className={mode === 'light' ? 'text-black' : 'text-white'} />;

    return (
        <Layout className={mode === 'light' ? 'bg-white text-black' : 'bg-[#18191A] text-white'}>
            <Sider trigger={null} collapsible collapsed={collapsed} className={ mode === 'dark' ? `border-r-[0.2px] border-[#242526]` : ''}>
                <div className={` ${mode === 'light' ? 'bg-white' :'bg-[#18191A]' }  p-7 cursor-pointer`}>
                    <AiOutlineMenu size={22} onClick={() => setCollapsed(!collapsed)} />
                </div>
                <Menu
                    className={`h-[100vh] ${mode === 'dark' ? 'bg-[#18191A]' : 'bg-white'}`}
                    theme={mode === "light" ? 'light' : 'dark'}
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
                            key: '7',
                            icon: <BsBox size={22} />,
                            label: 'Box',
                        },
                    ]}
                />
            </Sider>
            <Layout className="h-[100vh]">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <nav className={mode === 'dark' ? 'bg-[#18191A]' : 'bg-[#ffffff]'}>
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <a href="#" className={`${mode === 'dark' ? "text-white": "text-black"} font-bold`}>Home</a>
                                <a href="#" className={mode === 'dark' ? "text-white": "text-black"}>File</a>
                                <a href="#" className={mode === 'dark' ? "text-white": "text-black"}>Edit</a>
                                <a href="#" className={mode === 'dark' ? "text-white": "text-black"}>Library</a>
                            </div>

                            <div className="flex items-center justify-center">
                                <input type="text" placeholder="Search" className="bg-gray-50 h-8 rounded-md w-64 px-4"/>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    type="text"
                                    icon={mode === 'light' ? moonIcon : sunIcon}
                                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                                >
                                </Button>
                                <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
                            </div>
                        </div>
                    </nav>
                </Header>
                <Content
                    style={{
                        minHeight: 280,
                        background: mode === 'light' ? '#ffffff' : '#18191A',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoardLayout;