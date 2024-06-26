import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto) {
    return this.balanceService.create(createBalanceDto);
  }

  @Get()
  findAll() {
    return this.balanceService.findAll();
  }

  @Get('projects/:id')
  findAllByProject(@Param('id', MongoIdPipe) id: string) {
    return this.balanceService.findAllByProject(id);
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.balanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ) {
    return this.balanceService.update(id, updateBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.balanceService.remove(id);
  }
}
