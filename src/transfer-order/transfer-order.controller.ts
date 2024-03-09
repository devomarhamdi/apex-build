import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransferOrderService } from './transfer-order.service';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';

@Controller('transfer-order')
export class TransferOrderController {
  constructor(private readonly transferOrderService: TransferOrderService) {}

  @Post()
  create(@Body() createTransferOrderDto: CreateTransferOrderDto) {
    return this.transferOrderService.create(createTransferOrderDto);
  }

  @Post('orders')
  createOrders(
    @Body()
    createTransferOrderDto: CreateTransferOrderDto[],
  ) {
    return this.transferOrderService.createMany(createTransferOrderDto);
  }

  @Get()
  findAll() {
    return this.transferOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.transferOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateTransferOrderDto: UpdateTransferOrderDto,
  ) {
    return this.transferOrderService.update(id, updateTransferOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.transferOrderService.remove(id);
  }
}
