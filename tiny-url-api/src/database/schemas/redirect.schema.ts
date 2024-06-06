import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Static
import { DATABASE_COLLECTION_NAMES } from '../../application/app.static';

@Schema({
  collection: DATABASE_COLLECTION_NAMES.REDIRECT,
})
export class Redirect {
  _id: Types.ObjectId;

  @Prop()
  tinyUrl: string;

  @Prop()
  originalUrl: string;
}

export type RedirectDocument = Redirect & Document;

export const RedirectSchema = SchemaFactory.createForClass(Redirect);

RedirectSchema.index(
  { tinyUrl: 1 },
  { unique: true, name: 'tiny_url_unique_index' },
);
