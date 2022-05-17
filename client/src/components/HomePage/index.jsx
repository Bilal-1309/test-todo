import React from 'react';
import Header from "../Header";
import Input from "../Input";
import TodoList from "../TodoList";
import styles from './homepage.module.css'

const HomePage = () => {
    return (
        <div  className={styles.homepage}>
            <Header/>
            <Input/>
            <TodoList/>
        </div>
    );
};

export default HomePage;