export class TodoItem {
  constructor(
    public content: string,
    public group: string,
    public dateCreated: Date,
    public dateDue: Date,
    public completed: boolean,
  ) {}
}
