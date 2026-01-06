// TODO: імпортуй потрібні типи з ./types
import type { BookId, Genre, LoanStatus } from "./types";

export class Book {
  // TODO: додай типи до властивостей
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;

  private status: LoanStatus = "available";
  private borrowedBy: string | null = null;

  // TODO: реалізуй конструктор з параметром opts
  constructor(opts: {
    id: BookId;
    title: string;
    author: string;
    year: number;
    genre: Genre;
    status?: LoanStatus;
    borrowedBy?: string | null;
  }) {
    this.id = opts.id;
    this.title = opts.title;
    this.author = opts.author;
    this.year = opts.year;
    this.genre = opts.genre;
    this.status = opts.status ?? this.status;
    this.borrowedBy = opts.borrowedBy ?? this.borrowedBy;
  }

  // TODO: методи відповідно до ТЗ
  getStatus() {
    return this.status;
  }

  markBorrowed(personName: string) {
    if (this.status !== "available") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }

    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned() {
    if (this.status === "available") {
      throw new Error("Already available");
    }

    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo() {
    return `${this.title} — ${this.author} (${this.year}), ${this.genre} [${
      this.status === "available"
        ? "Available"
        : "Borrowed by " + this.borrowedBy
    }]`;
  }
}
