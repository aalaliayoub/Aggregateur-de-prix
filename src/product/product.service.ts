import { BadRequestException, HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly ProdutsModele: Model<Product>){}
  async create(createProductDto: CreateProductDto) {
    try{
      const newProduct=new this.ProdutsModele(createProductDto)
      return await newProduct.save();
    }
    catch(error){
      if(error.code==11000){
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'Duplicate key error',
            details: error.keyValue, 
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new BadRequestException(error.errmsg)
    }
    
  }

  async findAll() {
    return await this.ProdutsModele.find();
  }

  async findOne(id:string) {
    return await this.ProdutsModele.findById({_id:id});
  }

  async update(id:string, updateProductDto: UpdateProductDto) {
    return await this.ProdutsModele.updateOne({_id:id},{$set:updateProductDto});
  }

  async remove(id:string) {
    const deleteProduct= await this.ProdutsModele.deleteOne({_id:id});
    if(!deleteProduct){
      throw new BadRequestException("this user not found")
    }
    
    return {
      message:"deleted",
      product:{
        ...deleteProduct
      }
    }
  }
}
