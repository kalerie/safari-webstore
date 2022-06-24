import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto, UpdateProductDto, Product, ProductDocument } from "@safari-store/api-interfaces";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {    }

    async getAll(): Promise<Product[]> {
        return this.productModel.find().populate(['colors', 'sizes']).exec();
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).populate(['colors', 'sizes']);
        if(!product.colors) {
            product.colors = [];
        }
        if(!product.sizes) {
            product.sizes = [];
        }

        return product;
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto);
        // await newProduct.populate('colors');
        return newProduct.save();
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id);
    }

    async update(id: string, productDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true});
    }


    // const getTutorialWithPopulate = function(id) {
    //     return db.Tutorial.findById(id).populate("tags");
    // };
    // const getTagWithPopulate = function(id) {
    // return db.Tag.findById(id).populate("tutorials");
    // };
    // // whithout _id and _v
    // const getTutorialWithPopulate = function(id) {
    //     return db.Tutorial.findById(id).populate("tags", "-_id -__v -tutorials");
    // };
    // const getTagWithPopulate = function(id) {
    // return db.Tag.findById(id).populate("tutorials", "-_id -__v -tags");
    // };
    
}