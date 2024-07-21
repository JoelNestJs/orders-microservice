import { OrderStatus } from "@prisma/client";

export const ORDER_STATUS_LIST = [OrderStatus.PENDING, OrderStatus.DELIVERED, OrderStatus.CANCELLED];