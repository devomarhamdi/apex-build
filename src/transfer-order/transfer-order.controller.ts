import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransferOrderService } from './transfer-order.service';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';
import { UpdateIncomeDto } from './dto/update-income.dto';

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

  @Get('income')
  income() {
    return this.transferOrderService.income();
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

  @Patch('update-income/:id')
  updateIncome(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    return this.transferOrderService.updateIncome(id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.transferOrderService.remove(id);
  }
}
