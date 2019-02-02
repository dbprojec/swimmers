import React, { Component } from 'react';
import "antd/dist/antd.css";
import { HttpUtil } from '../..//utils/http.util';
import {
  Table, Button
} from 'antd'

class SwimmerTable extends Component {
  httpUtil = HttpUtil.getInstance();
  state = {
    swimmers: [],
    loading: true
  }

  columns = [{
    title: 'Name',
    dataIndex: 'name',
    filters: [{
      text: 'Joe',
      value: 'Joe',
    }, {
      text: 'Jim',
      value: 'Jim',
    }, {
      text: 'Submenu',
      value: 'Submenu',
      children: [{
        text: 'Green',
        value: 'Green',
      }, {
        text: 'Black',
        value: 'Black',
      }],
    }],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  }, {
    title: 'Age',
    dataIndex: 'birthday',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  }, {
    title: 'Time',
    dataIndex: 'time',
    sorter: (a, b) => a.time - b.time,
    sortDirections: ['descend', 'ascend'],
  }];


  constructor(props) {
    super(props)
    this.getBestInSeason = this.getBestInSeason.bind(this)
    this.getBestInAgeGroup = this.getBestInAgeGroup.bind(this)
    this.getBestInGender = this.getBestInGender.bind(this)
    this.getAllSwimmers = this.getAllSwimmers.bind(this)
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
        console.log(data)
        this.setState({
          swimmers: data,
          loading: false
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getAllSwimmers()
  }

  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  handleClick(e) {
    
  }

  render() {
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.handleClick}>Sort age</Button>
          <Button onClick={this.handleClick}>Clear filters</Button>
          <Button onClick={this.handleClick}>Clear filters and sorters</Button>
        </div>
        <Table columns={this.columns} dataSource={this.state.swimmers} loading={this.state.loading} onChange={this.onChange} />
      </div>
      )
  }
}

export default SwimmerTable;