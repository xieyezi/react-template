import * as React from 'react'
import { Component } from 'react'
import styles from './style.module.scss'
export interface HomeProps {}

export interface HomeState {}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {}
  }
  render() {
    return <div className={styles.home}>welcome to xieyezi-cli react-template</div>
  }
}

export default Home
