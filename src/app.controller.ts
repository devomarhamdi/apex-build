import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  get() {
    return 'WELCOME TO APEXBUILD';
  }

  @Get('photos/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }
}
