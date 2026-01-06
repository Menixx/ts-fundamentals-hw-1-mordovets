// TODO: імпортуй Book і типи
import { Book } from "./book";
import type { BookId } from "./types";

export class Library {
  // TODO: реалізуй колекцію книжок (Map або іншу структуру)
  private items: Record<BookId, Book> = {};

  add(item: Book) {
    if (item.id in this.items) {
      throw new Error("Item already exists");
    }

    this.items[item.id] = item;
  }

  remove(id: BookId) {
    const book = this.getBookOrThrow(id);

    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }

    delete this.items[id];
  }

  listAll() {
    return Object.values(this.items);
  }

  listAvailable() {
    return Object.values(this.items).filter(
      (book) => book.getStatus() === "available"
    );
  }

  borrow(bookId: BookId, personName: string) {
    this.getBookOrThrow(bookId).markBorrowed(personName);
  }

  return(bookId: BookId) {
    this.getBookOrThrow(bookId).markReturned();
  }

  getBookOrThrow(id: BookId): Book {
    if (!(id in this.items)) {
      throw new Error("Book not found");
    }

    return this.items[id];
  }
}
