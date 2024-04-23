import { Injectable, NotFoundException, ValidationError } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, requestStatus } from 'src/schemas/request.schema';
import { ItemDescriptionService } from 'src/item-description/item-description.service';
import { ProjectsService } from 'src/projects/projects.service';
import { validate } from 'class-validator';
import { async } from 'rxjs';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name)
    private requestModel: Model<Request>,
    private readonly itemDescriptionService: ItemDescriptionService,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    // Finding all the required fields
    await this.itemDescriptionService.findOne(
      createRequestDto.itemDescription.toString(),
    );

    await this.projectService.findOne(createRequestDto.toProject.toString());

    // Increaseing the request number
    const latestRequest = await this.requestModel.findOne().sort('-requestNo').exec();
    const requestNo = latestRequest ? latestRequest.requestNo + 1 : 1;

    createRequestDto.requestNo = requestNo;

    // Intializing the request status
    createRequestDto.status = requestStatus.processing;
    return await this.requestModel.create(createRequestDto);
  }

  async createMany(createRequestDtos: CreateRequestDto[]) {
    const requests = [];
    try {
      for (const createRequestDto of createRequestDtos) {
        // Finding all the required fields
        await this.itemDescriptionService.findOne(
          createRequestDto.itemDescription.toString(),
        );

        await this.projectService.findOne(createRequestDto.toProject.toString());

        // Increaseing the request number
        const latestRequest = await this.requestModel.findOne().sort('-requestNo').exec();
        const requestNo = latestRequest ? latestRequest.requestNo + 1 : 1;

        createRequestDto.requestNo = requestNo;

        // Intializing the request status
        createRequestDto.status = requestStatus.processing;
        requests.push(await this.requestModel.create(createRequestDto));
      }

      const res = {
        results: requests.length,
        data: requests,
      };

      return res;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const requests = await this.requestModel
      .find()
      .populate({
        path: 'itemDescription',
        select: ['itemDescription', 'code', 'Weight', '-_id'],
      })
      .populate({
        path: 'fromProject',
        select: ['name', '-_id'],
      })
      .populate({
        path: 'toProject',
        select: ['name', '-_id'],
      });

    if (requests.length === 0) {
      return { message: 'There is no requests found' };
    }

    const response = {
      results: requests.length,
      data: requests,
    };

    return response;
  }

  async findOne(id: string) {
    const request = await this.requestModel
      .findById(id)
      .populate({
        path: 'itemDescription',
        // select: ['itemDescription', 'code', 'Weight', '-_id'],
      })
      .populate({
        path: 'fromProject',
        // select: ['name', '-_id'],
      })
      .populate({
        path: 'toProject',
        // select: ['name', '-_id'],
      });

    if (!request) {
      throw new NotFoundException('No request found');
    }

    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const request = await this.requestModel.findById(id);

    if (!request) {
      throw new NotFoundException('No request found');
    }
    // Getting all the required fields

    if (updateRequestDto.itemDescription) {
      const itemDescription = await this.itemDescriptionService.findOne(
        updateRequestDto.itemDescription.toString(),
      );
      updateRequestDto.itemDescription = itemDescription;
    }
    if (updateRequestDto.toProject) {
      const toProject = await this.projectService.findOne(
        updateRequestDto.toProject.toString(),
      );
      updateRequestDto.toProject = toProject;
    }

    return await this.requestModel.findByIdAndUpdate(id, updateRequestDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const request = await this.requestModel.findByIdAndDelete(id);

    if (!request) {
      throw new NotFoundException('No request found');
    }

    return request;
  }
}
