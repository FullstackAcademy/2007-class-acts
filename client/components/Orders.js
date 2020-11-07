import React from 'react';
import axios from 'axios'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import { orderStatuses } from '../../server/constants'

export default class Orders extends React.Component{
  constructor(){
    super()
    this.state = {
      orders: []
    }
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
  }

  async componentDidMount() {
    const orders = (await axios.get('/api/orders')).data
    this.setState({...this.state, orders})
  }

  async changeOrderStatus(ev, order) {
    try {
      order.status = ev.target.value
      const updatedOrder = (await axios.put(`/api/orders/${order.id}`, order)).data
      const orders = this.state.orders.filter(o=> o.id !== order.id)
      orders.push(updatedOrder)
      this.setState({...this.state, orders })
    } catch (er) {
      console.log(er)
    }
  }

  render() {
    const { orders } = this.state
    if(orders.length === 0) return (<div>Not a terribly popular store.</div>)
    return (
      <div>
        <h1>Orders</h1>
        <table className="gs-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Status</th>
              <th>Address</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          { orders
            .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
            .map(order=>{
            return (
              <tr key={order.id}>
                <td><Link to={{
                 pathname: `/admin/orders/${order.id}`,
                 state: order
                }}>{order.id.slice(0,8)}</Link></td>
                <td>{dayjs(order.date).format('MMM D, YYYY h:mm A')}</td>
                <td>
                  <select onChange={(ev)=>this.changeOrderStatus(ev,order)} value={order.status}>
                    {
                      orderStatuses.map(status => <option key={status}>{status}</option>)
                    }
                  </select>
                </td>
                <td>{order.address}</td>
                <td>{order.user ? order.user.email : order.email}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}
