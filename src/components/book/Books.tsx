import {useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import { BookType, ResponseType } from "./Book.type.ts";
import { Spinner } from "reactstrap";
import BookItem from "./BookItem.tsx";
import BooksHeader from "./BooksHeader.tsx";
import BookFooter from "./BookFooter.tsx";
import ToolBar from "../toolbar/ToolBar.tsx";
import axios from 'axios';

const URL = 'http://localhost:3000/books';

const Books = () => {
    const [books, setBooks] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [language, setLanguage] = useState('en')
    const [seed, setSeed] = useState('')
    const [likes, setLikes] = useState<number | number[]>(0)
    const [review, setReview] = useState('')
    const limit = 20;

    const handleLanguage = (language: string) => {
        setLanguage(language);
        setOffset(0);
        setBooks([])
    }

    const handleSeed = (seed: string) => {
        setSeed(seed);
        setOffset(0);
        setBooks([])
    }

    const handleLikes = (likes: number | number[]) => {
        setLikes(likes);
        setOffset(0);
        setBooks([])
    }

    const handleReview = (review: string) => {
        setReview(review);
        setOffset(0);
        setBooks([])
    }

    const fetchBooks = () => {
        if (loading) return;
        setLoading(true);
        axios
            .post(URL, { offset, limit, language, seed: +seed + offset, likes, review: +review })
            .then(({ data }: {data: ResponseType}) => {
                if (data.statusCode === 200) {
                    setBooks(prevBooks => [...prevBooks, ...data.books]);
                    setHasMore(data.books.length === limit);
                    setOffset(prevOffset => prevOffset + limit);
                } else {
                    toast.error(data.message);
                }
            })
            .catch(data => toast.error(data.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchBooks();
    }, [language, seed, likes, review]);

    return (
        <div className="container">
            <ToolBar
                language={language}
                handleLanguage={handleLanguage}
                seed={seed}
                handleSeed={handleSeed}
                likes={likes}
                handleLikes={handleLikes}
                review={review}
                handleReview={handleReview}
            />
            <InfiniteScroll
                dataLength={books.length}
                next={fetchBooks}
                hasMore={hasMore}
                loader={<Spinner color="primary" />}
                endMessage={<BookFooter />}
                style={{ overflow: 'visible' }}
            >
                <BooksHeader />
                {books.map((book) => <BookItem key={book.isbn} {...book} />)}
            </InfiniteScroll>
            <ToastContainer />
        </div>
    )
}

export default Books;