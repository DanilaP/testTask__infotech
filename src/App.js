import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
    const [posts, setPosts] = useState();
    const [activePosts, setActivePosts] = useState();
    const [pages, setPages] = useState();
    const [activePage, setActivePage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const loadNextPageInfo = () => {
        if (activePage >= 2) {
            setActivePage(activePage-1);
        }
    }
    const loadPreviousPageInfo = () => {
        if (activePage < pages.length) {
            setActivePage(activePage+1);
        }
    }
    const sortPosts = (sortParametr) => {
        if (sortParametr === "ID") {
            let sortedArray = [...activePosts].sort((prev, next) => {
                if (prev.id > next.id) {
                    return -1;
                }
                else return 1;
            })
            setActivePosts(() => sortedArray);
        }
        else if (sortParametr === "NAME") {
            let sortedArray = [...activePosts].sort((prev, next) => {
                if (prev.title > next.title) {
                    return -1;
                }
                else return 1;
            })
            setActivePosts(() => sortedArray);
        }
        else {
            let sortedArray = [...activePosts].sort((prev, next) => {
                if (prev.body > next.body) {
                    return -1;
                }
                else return 1;
            })
            setActivePosts(() => sortedArray);
        }
    }
    const enterPressed = (event) => {
        let code = event.keyCode || event.which;
        if(code === 13) { 
            let newActivePosts = [];
            for (let i = 0; i < activePosts.length; i++) {
                if ((toString(activePosts[i].id).includes(searchText)) || (activePosts[i].title.includes(searchText)) || (activePosts[i].body.includes(searchText))) {
                    newActivePosts = [...newActivePosts, activePosts[i]];
                }
            }
            console.log(newActivePosts);
            setActivePosts(newActivePosts);
        } 
    }
    useEffect(() => {
        setActivePosts(posts?.slice((activePage-1)*10, (activePage-1)*10+10));
    }, [activePage])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
            setPosts(res.data);
            let ourPages = [];
            for (let i = 1; i<= res.data.length/10; i++) {
                ourPages = [...ourPages, i];
            }
            setPages(ourPages);
            setActivePosts(res.data.slice(0, 10))
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className="App">
            <div className='wrapper'>
                <div className='input__box'>
                    <input onKeyPress={enterPressed.bind(this)} onChange={(e) => setSearchText(e.target.value)} placeholder='Поиск' />
                </div>
                <div className='table__box'>
                    <div className='table__header'>
                        <div className='select' onClick={() => sortPosts("ID")} id='id'>
                            <div>ID</div>
                        </div>
                        <div className='select' onClick={() => sortPosts("NAME")} id='name'>
                            <div>Заголовок</div>
                        </div>
                        <div className='select' onClick={() => sortPosts("DESCRIPTION")} id='description'>
                            <div>Описание</div>
                        </div>
                    </div>
                    <div className='table__content'>
                        {activePosts?.map((element, index) => {
                            return (
                                <div key={index} className='row'>
                                    <div className='id__column'>{element.id}</div>
                                    <div className='name__column'>{element.title}</div>
                                    <div className='description__column'>{element.body}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='footer__box'>
                    <div className='back__button' onClick={loadNextPageInfo}>Назад</div>
                    <div className='numbers'>
                        {
                            pages?.map((el, index) => {
                                return (
                                    <div key={index}>{el}</div>
                                )
                            })
                        }
                    </div>
                    <div className='next__button' onClick={loadPreviousPageInfo}>Далее</div>
                </div>
            </div>
        </div>
    );
}

export default App;
