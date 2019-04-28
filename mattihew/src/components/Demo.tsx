import * as React from 'react';

export interface DemoProps {

}

export interface DemoState {
    count: number;
}

export default class Demo extends React.Component<DemoProps, DemoState> {
    constructor(props: DemoProps) {
        super(props);
        this.state = {count: 0};
    }

    increment() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div>
                <h1>count = {this.state.count}</h1>
                <button onClick={() => this.increment()} >Increment</button>
            </div>
        );
    }
}
