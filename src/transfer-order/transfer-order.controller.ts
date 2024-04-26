import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { TransferOrderService } from './transfer-order.service';
import { CreateTransferOrderDto } from './dto/create-transfer-order.dto';
import { UpdateTransferOrderDto } from './dto/update-transfer-order.dto';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('transfer-order')
export class TransferOrderController {
  constructor(private readonly transferOrderService: TransferOrderService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Specify the directory where files will be stored
        filename: (req, file, cb) => {
          // Generate a unique filename
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body()
    createTransferOrderDto: CreateTransferOrderDto,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    return this.transferOrderService.create(createTransferOrderDto, image);
  }

  @Get('photos/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }

  // @Post('orders')
  // createOrders(
  //   @Body()
  //   createTransferOrderDto: CreateTransferOrderDto[],
  // ) {
  //   return this.transferOrderService.createMany(createTransferOrderDto);
  // }

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
