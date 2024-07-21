import { OrderStatus } from "@prisma/client";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { ORDER_STATUS_LIST } from "../emun";

export class CreateOrderDto {

    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum(ORDER_STATUS_LIST, { message: `Posible status value are ${ ORDER_STATUS_LIST }` })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false;
}
