import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {

    @Prop({required:true,unique:true})
    name:string

    @Prop({required:true})
    description:string

    @Prop({required:true})
    categorie:string


}
export const Products=SchemaFactory.createForClass(Product)