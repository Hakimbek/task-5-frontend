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
    review: number;
}

export interface ResponseType {
    message: string;
    statusCode: number;
    books: BookType[];
}