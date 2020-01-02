import * as React from 'react'
import { Component } from 'react'

export interface ExampleProps {}

export interface ExampleState {}

class Example extends Component<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props)
    this.state = {}
  }
  render() {
    return <div> Example tempalte</div>
  }
}

export default Example
