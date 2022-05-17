import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUsers, logOut} from "../../redux/features/auth";
import styles from './header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsers())
    }, [dispatch]);
    const token = useSelector((state) => state.authReducer.token);
    const idAuth = useSelector((state) => state.authReducer.id);
    const users = useSelector((state) => state.authReducer.users);
    const admin = users.find((item) => (item ? item.role === "admin" : null));
    const user = users.find((user) => (user ? user.role === 'user' : null));

    const handleClickLogOut = () => {
        dispatch(logOut());
    };


    if (!users.length) {
        return "загрузка"
    }
    return (
        <div className={styles.header}>
            <div>
                <NavLink to={'/'}>
                    To Do List
                </NavLink>
            </div>
            <div >
                {admin ? (
                    !token ? null : idAuth !== admin._id ? (
                            user.email
                    ) : (
                        <>Админ</>
                    )
                ) : null}
            </div>
            <div>
                {
                    !token ? (
                        <NavLink to={"/signin"}>
                            Вход
                        </NavLink>
                    ): (
                        <NavLink className={styles.out} to={'/'}
                        color="red"
                        onClick={handleClickLogOut}>
                            Выход
                        </NavLink>
                    )
                }
            </div>
        </div>
    );
};

export default Header;