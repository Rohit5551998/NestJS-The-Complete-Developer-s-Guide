import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {

  }

}
