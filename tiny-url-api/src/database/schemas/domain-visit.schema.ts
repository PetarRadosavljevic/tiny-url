import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Static
import { DATABASE_COLLECTION_NAMES } from '../../application/app.static';

@Schema({
  collection: DATABASE_COLLECTION_NAMES.DOMAIN_VISIT,
  timestamps: { createdAt: true, updatedAt: false },
})
export class DomainVisit {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  createdAt: Date;
}

export type DomainVisitDocument = DomainVisit & Document;

export const DomainVisitSchema = SchemaFactory.createForClass(DomainVisit);

// We don't need to hold data more than 24h
DomainVisitSchema.index(
  { createdAt: -1 },
  { expireAfterSeconds: 60 * 60 * 24, name: 'created_at_expire_index' },
);
