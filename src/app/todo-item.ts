export class TodoItem {
  constructor(
    public content: string,
    public category: string,
    public dateDue: Date,
    public dateCreated: Date = new Date(),
    public completed: boolean = false,
  ) {}
}
