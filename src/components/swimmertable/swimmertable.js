import React, { Component } from 'react';
import "antd/dist/antd.css";
import { HttpUtil } from '../..//utils/http.util';
import { Table, Button, Divider, Layout } from 'antd'
import { Menu, Dropdown, Input, Icon, Row, Col} from 'antd';
import Highlighter from 'react-highlight-words';
const { Header, Content, Sider} = Layout;

class SwimmerTable extends Component {
  httpUtil = HttpUtil.getInstance();
  state = {
    swimmers: [],
    originalSwimmers: [],
    loading: true,
    searchText: '',
    season: 1
  }

  handleAgeGroupClick(e) {
    console.log(e)
    if (e > 20) {
      this.setState({
        swimmers: this.state.originalSwimmers.filter(swimmer => parseInt(swimmer.birthday) >= 20)
      })
    } else {
      this.setState({
        swimmers: this.state.originalSwimmers.filter(swimmer => parseInt(swimmer.birthday) < 20)
      })
    }
  }

  handleSeasonClick(e) {
    console.log(e)
    this.setState({
      season: e
    })
  }

  ageGroupMenu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleAgeGroupClick.bind(this, 1)}>under 20</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleAgeGroupClick.bind(this, 23)}>adult</a>
      </Menu.Item>
    </Menu>
  )

  seasonMenu = (
    <Menu>
      <Menu.Item key="0">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleSeasonClick.bind(this, 1)}>first (I)</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleSeasonClick.bind(this, 2)}>second (II)</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleSeasonClick.bind(this, 3)}>third (III)</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleSeasonClick.bind(this, 4)}>fourth (IV)</a>
      </Menu.Item>
    </Menu>
  );


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  constructor(props) {
    super(props)
    this.getBestInSeason = this.getBestInSeason.bind(this)
    this.getBestInAgeGroup = this.getBestInAgeGroup.bind(this)
    this.getBestInGender = this.getBestInGender.bind(this)
    this.getAllSwimmers = this.getAllSwimmers.bind(this)
    this.getColumnSearchProps = this.getColumnSearchProps.bind(this)

  }

  getBestInSeason(season, ageGroup, year) {
    this.setState({
      loading: true
    })
    this.httpUtil.get('best in the season', {
        season: season,
        ageGroup: ageGroup
      })
      .then(data => this.setState({
        swimmers: data.data,
        loading: false
      }))
  }

  getBestInAgeGroup(ageGroup, season, year) {
    this.setState({
      loading: true
    })
    this.httpUtil.get('age', ageGroup)
      .then(data => this.setState({
        swimmers: data.data,
        loading: false
      }))
  }

  getBestInGender(gender, season, year) {
    this.setState({
      loading: true
    })
    this.httpUtil.get('gender', gender)
      .then(data => this.setState({
        swimmers: data.data,
        loading: false
      }))
  }

  getAllSwimmers() {
    this.setState({
      loading: true
    })
    this.httpUtil.get('all', null)
      .then(res => res.data.data)
      .then(data => {
        let done = false;
        data.map((swimmer, index) =>{
          swimmer.key = swimmer._id
          if (index === data.length - 1) {
            done = true
          }
        })
        if (done) {
          this.setState({
            swimmers: data,
            originalSwimmers: data,
            loading: false
          })
        }
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getAllSwimmers()
  }

  onChange(pagination, filters, sorter) {
  }

  handleClick(e) {
  }

  render() {
    let columns = [{
      title: 'Name',
      dataIndex: 'name',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'Jim',
        value: 'Jim',
      }],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
      ...this.getColumnSearchProps('name')
    }, {
      title: 'Age',
      dataIndex: 'birthday',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
      ...this.getColumnSearchProps('birthday')
    }, {
      title: 'Time',
      dataIndex: 'score['+(this.state.season - 1)+'].time',
      sorter: (a, b) => a.score[this.state.season] - b.score[this.state.season],
      sortDirections: ['descend', 'ascend'],
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      defaultSortOrder: 'descend',
      filters: [{
        text: 'Male',
        value: 'male',
      }, {
        text: 'Female',
        value: 'female',
      }],
      // specify the condition of filtering result
      // here is that finding the gender started with `value`
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ['descend', 'ascend'],
    }];
    return (
      <div>
        <Row gutter={36}>
          <Col span={12}>
            <div className="table-operations">
              <Dropdown overlay={this.ageGroupMenu}>
                <a className="ant-dropdown-link" href="#">
                  Age Group <Icon type="down" />
                </a>
              </Dropdown>
              <Dropdown overlay={this.seasonMenu}>
                <a className="ant-dropdown-link" href="#">
                  Season <Icon type="down" />
                </a>
              </Dropdown>        
            </div>
            <Table columns={columns} dataSource={this.state.swimmers} loading={this.state.loading} onChange={this.onChange} />
          </Col>
          <Col span={12}>
            <Table columns={columns} dataSource={this.state.originalSwimmers} loading={this.state.loading} onChange={this.onChange} />
          </Col>
        </Row>
      </div>
      )
  }
}

export default SwimmerTable;