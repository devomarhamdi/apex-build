import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemDescriptionService } from './item-description.service';
import { CreateItemDescriptionDto } from './dto/create-item-description.dto';
import { UpdateItemDescriptionDto } from './dto/update-item-description.dto';

@Controller('item-description')
export class ItemDescriptionController {
  constructor(private readonly itemDescriptionService: ItemDescriptionService) {}

  @Post()
  create(@Body() createItemDescriptionDto: CreateItemDescriptionDto) {
    return this.itemDescriptionService.create(createItemDescriptionDto);
  }

  @Get()
  findAll() {
    return this.itemDescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemDescriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDescriptionDto: UpdateItemDescriptionDto) {
    return this.itemDescriptionService.update(+id, updateItemDescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemDescriptionService.remove(+id);
  }
}
