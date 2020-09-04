import { ObjectId } from "mongodb";

interface Note {
  _id: ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Note;
