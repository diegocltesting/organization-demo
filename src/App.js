import logo from './logo.svg';
import logoBlack from './logo_black.svg';
import { Avatar, Badge, Button, Menu, PageHeader, Tabs } from 'antd';
import './App.css';
import Grid from './components/Grid';
import { PlusOutlined, InboxOutlined, BellOutlined, QuestionCircleOutlined, DownOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

export const apiUrl = 'http://localhost:80/api/divisions';

function App() {

  return (
    <div className="App">
      <Menu mode='horizontal' className='menu-background'>
        <Menu.Item className='menu-item' key='logo'>
          <img className='logo' src={logo} alt="logo" />
        </Menu.Item>
        <Menu.Item className='menu-item' key='dashboard'>
          Dashboard
        </Menu.Item>
        <Menu.Item className='menu-item' key='organization'>
          Organización
        </Menu.Item>
        <Menu.Item className='menu-item' key='models'>
          Modelos <DownOutlined />
        </Menu.Item>
        <Menu.Item className='menu-item' key='follow-up'>
          Seguimiento <DownOutlined />
        </Menu.Item>
        <Menu.Item className='menu-item menu-right' key='inbox'>
          <InboxOutlined className='menu-icon' />
        </Menu.Item>
        <Menu.Item className='menu-item' key='help'>
          <QuestionCircleOutlined className='menu-icon' />
        </Menu.Item>
        <Menu.Item className='menu-item' key='notification'>
          <Badge count={3} size='small'><BellOutlined className='menu-icon' /></Badge>
        </Menu.Item>
        <Menu.Item className='menu-item' key='user'>
          <Avatar className='avatar'>A</Avatar> Administrador <DownOutlined className='margin-left' />
        </Menu.Item>
        <Menu.Item className='menu-item' key='logo2'>
          <Button className='button-logo' icon={<img className='logo' src={logoBlack} style={{ fill: 'black' }} alt="logo" />} />
        </Menu.Item>
      </Menu>
      <PageHeader title="Organización" backIcon={false} />
      <div>
        <Tabs defaultActiveKey='1'
          tabBarExtraContent={{
            right: <div className='margin-right-20'>
              <Button type='primary' icon={<PlusOutlined />} />
              <Button icon={<UploadOutlined />} />
              <Button icon={<DownloadOutlined />} />
            </div>
          }}>
          <TabPane tab="Divisiones" key="1">
            <Grid />
          </TabPane>
          <TabPane tab="Colaboradores" key="2">
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
