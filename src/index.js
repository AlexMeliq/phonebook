import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PhoneBook extends React.Component {

    state = {
        users: [
            {
                firstName: 'John',
                lastName: 'Smith',
                birthDay: '1999-06-15',
                phoneNumber: '121212777777'
            },
            {
                firstName: 'maria',
                lastName: 'Felix',
                birthDay: '2005-05-12',
                phoneNumber: '121212777777'
            },
            {
                firstName: 'Robert',
                lastName: 'rKt',
                birthDay: '1985-01-24',
                phoneNumber: '121212777777'
            },
            {
                firstName: 'Angelina',
                lastName: 'Roberts',
                birthDay: '1975-12-12',
                phoneNumber: '121212777777'
            },
            {
                firstName: 'Vlad',
                lastName: 'Johnson',
                birthDay: '1999-11-15',
                phoneNumber: '121212777777'
            }
        ],
        firstName: '',
        lastName: '',
        birthDay: '',
        phoneNumber: '',

        editingIndex: null,
        sortedList: [],
        searchString: ''
    }

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount (){

    }
    componentWillUpdate(){

    }
    searchFields = (e) => {
        let val = e.target.value;
        this.setState({searchString: val})
    }
    /**
     *
     * @param e
     */
    changeField = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    /**
     *
     * @param index
     */
    editThis = (index) => {
        let {users} = this.state;
        console.log('---', index);
        this.setState({
            editingIndex: index,
            firstName: users[index].firstName,
            lastName: users[index].lastName,
            birthDay: users[index].birthDay,
            phoneNumber: users[index].phoneNumber,
        })
    }
    /**
     *
     * @param index
     */
    removeThis = (index) => {
        let {users} = this.state;
        users.splice(index, 1);
        this.setState({users:users})
    }
    /**
     *
     * @param e
     */
    submitForm = (e) => {
        e.preventDefault();
        let {users, firstName, lastName, birthDay, phoneNumber, editingIndex} = this.state;
        let newUser = {
            firstName: firstName,
            lastName: lastName,
            birthDay: birthDay,
            phoneNumber: phoneNumber,
        }

        editingIndex ? users[editingIndex] = newUser : users.push(newUser);//check if user want edit

        this.setState({
            users: users
        }, ()=>{
            this.setState({
                firstName: '',
                lastName: '',
                birthDay: '',
                phoneNumber: '',
                editingIndex: null
            })
        })
    }
    /**
     *
     * @param e
     */
    mySort = (e) => {
        let {users, sortedList} = this.state;
        let name = e.target.id;
        let sortingIndex = sortedList.indexOf(name);
        let sendingName = name;
        if( sortingIndex === -1){
            sortedList.push(name);
        }else{
            sortedList.splice(sortingIndex, 1);
            sendingName = '-' + name;
        }
        users.sort(dynamicSort(sendingName));
        this.setState({
            users: users,
            sortedList: sortedList,
            firstName: '',
            lastName: '',
            birthDay: '',
            phoneNumber: '',
            editingIndex: null
        })
        // .sort(compare);
    }

    render() {
        return (
            <div className="PhoneBook">
                {this.renderForm()}
                {this.renderBook()}
            </div>
        )
    }
    /*
     * Functions for content getting
     * */
    /**
     * Facility Name (& ar)
     * @returns {XML}
     */
    renderForm = () => {
        let {firstName, lastName, birthDay, phoneNumber, editingIndex} = this.state;
        return (
            <div className="inputForm">
                <form onSubmit={this.submitForm} action="">
                    <div className="inpWrap">
                        <label htmlFor="firstName">First Name</label>
                        <input required="required" onChange={this.changeField} type="text" value={firstName} name="firstName" id="firstName"/>
                    </div>
                    <div className="inpWrap">
                        <label htmlFor="lastName">Last Name</label>
                        <input required="required" onChange={this.changeField} type="text" value={lastName} name="lastName" id="lastName"/>
                    </div>
                    <div className="inpWrap">
                        <label htmlFor="birthDay">Your birthday</label>
                        <input required="required" onChange={this.changeField} type="date" value={birthDay} name="birthDay" id="birthDay"/>
                    </div>
                    <div className="inpWrap">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input required="required" onChange={this.changeField} type="number" value={phoneNumber} name="phoneNumber" id="phoneNumber"/>
                    </div>
                    <div className="submit">
                        <input type="submit" value={editingIndex !== null ? 'Save Contact' : 'Add Contact'} />
                    </div>
                </form>
            </div>
        )
    }
    /**
     * Facility Name (& ar)
     * @returns {XML}
     */
    renderBook = () => {
        let {users, searchString} = this.state;

        let filteredUsers = users.filter((person) => {
            let fullString = person.firstName.toLowerCase() + person.lastName.toLowerCase() + person.birthDay + person.phoneNumber;

            return fullString.indexOf(searchString.toLowerCase()) !== -1;
        });
        return (
            <div className="contactList">
                <div className="searchBar">
                    <input onChange={this.searchFields} type="text" className="search" placeholder="Search"/>
                </div>
                <div className="list">
                    <div className="sorting">
                        <p>ID</p>
                        <p onClick={this.mySort} id="firstName">First Name</p>
                        <p onClick={this.mySort} id="lastName">Last Name</p>
                        <p onClick={this.mySort} id="birthDay">BirthDay</p>
                        <p onClick={this.mySort} id="phoneNumber">Phone number</p>
                    </div>
                    {
                        filteredUsers.map((item, index)=>(
                            <div key={item.firstName + '_' + index}>
                                <p className="id">{index}</p>
                                <p className="firstName">{item.firstName }</p>
                                <p className="lastName">{item.lastName}</p>
                                <p className="birthDay">{item.birthDay}</p>
                                <p className="phoneNumber">{item.phoneNumber}</p>
                                <span className="edit" onClick={this.editThis.bind(this, index)}>Edit</span>
                                <span title="Remove this contact" className="remove" onClick={this.removeThis.bind(this, index)}>x</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

}
function dynamicSort(prop) {
    let order = 1;
    if(prop[0] === "-") {
        order = -1;
        prop = prop.substr(1);
    }
    return function (a,b) {
        let result = (a[prop].toLowerCase() < b[prop].toLowerCase()) ? -1 : (a[prop].toLowerCase() > b[prop].toLowerCase()) ? 1 : 0;
        return result * order;
    }
}
// ========================================

ReactDOM.render(
    <PhoneBook />,
    document.getElementById('root')
);
