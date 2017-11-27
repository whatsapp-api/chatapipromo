import React, {Component} from 'react';
import {
    Badge,
    Row,
    Col,
    Progress,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonToolbar,
    ButtonGroup,
    ButtonDropdown,
    Label,
    Input,
    Table
} from 'reactstrap';
import {Redirect} from 'react-router-dom';

import instanceList from '../../database/instanceList';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
        };
        this.onInstanceChange=this.onInstanceChange.bind(this)
    }

    onInstanceChange(instances){
        this.setState({instances: Object.values(instances)})
    }

    componentWillUnmount(){
        instanceList.removeOnChange(this.onInstanceChange);
    }

    componentDidMount() {
        instanceList.onChange(this.onInstanceChange);
    }

    render() {
        if (this.state.instances && this.state.instances[0]) {
            return <Redirect to={`/instance/${this.state.instances[0].id}`}/>
        }
        return (
            <div className="animated fadeIn">
                ...
            </div>
        )
    }
}

export default Dashboard;
