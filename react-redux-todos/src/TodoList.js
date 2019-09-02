import React from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import {connect} from 'react-redux';
//import { ADD_TODO, REMOVE_TODO } from './actionCreators';
import {addTodo, removeTodo, getTodos} from './actionCreators'
import {Route} from 'react-router-dom';


class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        //this.removeTodo = this.removeTodo.bind(this);
    }

    componentDidMount(){
        this.props.getTodos();
    }
    
    handleAdd(val){
        this.props.addTodo(val);
    };

    removeTodo(id){
        this.props.removeTodo(id);
    };

    render(){
        let todos = this.props.todos.map((val, index)=>{
            return <Todo 
                        removeTodo={this.removeTodo.bind(this, val._id)} 
                        task={val.task} 
                        key={val._id}
                    />
        });

        return(
            <div>
                <Route path='/todos/new' component={props=>(
                    <NewTodoForm {...props} handleSubmit={this.handleAdd}/> 
                    )}
                 />
                <Route exact path='/todos' component={()=><div>{todos}</div>}/>
            </div>
        );
    }

}

function mapStateToProps(reduxState){
    return {
        todos: reduxState.todos
    }
};

/*
function mapDispatchToProps(dispatch){
    return {
        addTodo: function(task){
            dispatch({
                type: ADD_TODO,
                task
            })
        }
    }
}
*/

export default connect(mapStateToProps, {addTodo, removeTodo, getTodos})(TodoList);