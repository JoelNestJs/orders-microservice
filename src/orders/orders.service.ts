import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Conected OrdersService to Database.");
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto
    });
  }

  findAll() {
    return this.order.findMany();
  }

  async findOne(id: string) {
    const orderFind = await this.order.findFirst({ where: { id } });
    if ( !orderFind ) {
      throw new RpcException({status:404, message:`Product not found with id ${id}`});
    }
    return orderFind;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const orderFind = await this.findOne(id);
    return await this.order.update({
      data: { ...updateOrderDto }, 
      where: { id: orderFind.id }});
  }

  async remove(id: string) {
    const orderFind = await this.findOne(id);
    return await this.order.update({
      data: { status: OrderStatus.DELETED },
      where: { id: orderFind.id }});
  }
}
