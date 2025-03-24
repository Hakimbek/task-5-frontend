export interface BookType {
    index: number;
    genre: string;
    author: string;
    title: string;
    publisher: string;
    isbn: string;
    description: string;
    format: string;
    likes: number;
    review: {
        review: string;
        "review_author": string;
    }[];
}

export interface ResponseType {
    message: string;
    statusCode: number;
    books: BookType[];
}