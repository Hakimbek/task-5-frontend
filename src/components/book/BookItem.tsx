import { useState } from "react";
import { Collapse } from 'reactstrap';
import { BookType } from "./Book.type.ts";
import Like from "../svg/Like.tsx";
import Review from "../svg/Review.tsx";

const BookItem = ({
    index,
    title,
    author,
    publisher,
    isbn,
    format,
    description,
    likes,
    review
}: BookType) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="row border-bottom p-3 cursor-pointer">
            <div onClick={() => setIsOpen(!isOpen)} className="row cursor-pointer">
                <div className="col-3">{index}</div>
                <div className="col-3">{isbn}</div>
                <div className="col-3">{title}</div>
                <div className="col-3">{author}</div>
            </div>
            <Collapse isOpen={isOpen}>
                <div className="mt-4 d-flex gap-3 align-items-center">
                    <i className="bi bi-book"></i>
                    <div className="fs-3">{title}</div>
                    <div className="text-secondary">{format}</div>
                </div>
                <div className="d-flex mt-2 gap-3 align-items-center">
                    <i className="bi bi-pencil"></i>
                    <div className="text-secondary">by</div>
                    <div className="fs-4">{author}</div>
                </div>
                <div className="d-flex gap-3 mt-2 align-items-center">
                    <i className="bi bi-newspaper"></i>
                    <div className="fs-5">{publisher}</div>
                </div>
                <div className="d-flex gap-3 mt-2 align-items-center">
                    <i className="bi bi-body-text"></i>
                    <div>{description}</div>
                </div>
                <div className="d-flex gap-3 align-items-center mt-2">
                    <span className="badge bg-light text-dark d-flex align-items-center gap-2">
                        <Like/> {likes}
                    </span>
                    <span className="badge bg-light text-dark d-flex align-items-center gap-2">
                        <Review/> {review.length}
                    </span>
                </div>
                <div className="d-flex flex-column mt-2">
                    {review.map(({ review, review_author }) => (
                        <div className="alert alert-light">
                            <div>{review}</div>
                            <div className="text-end fst-italic text-dark">- {review_author}</div>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    )
}

export default BookItem;