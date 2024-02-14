import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schema/project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  async findAll() {
    const project = await this.projectModel.find();

    if (project.length === 0) {
      return { message: 'There is no projects found' };
    }

    const response = {
      results: project.length,
      data: project,
    };
    return response;
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('No project found');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('No project found');
    }

    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const project = await this.projectModel.findById(id);

    if (!project) {
      throw new NotFoundException('No project found');
    }

    return await this.projectModel.findByIdAndDelete(id);
  }
}
