export class Campaign {
  point: number;
  name: string;
  description: string;
  id: string;
  createDate: string;
  editDate: string

  constructor(point: number, name: string, description: string, id: string, createDate: string, editDate: string) {
    this.point = point;
    this.name = name;
    this.description = description;
    this.id = id;
    this.createDate = createDate;
    this.editDate = editDate;
  }
}
